(function(){
  const canvas = document.getElementById('glcanvas');
  /** @type {WebGLRenderingContext} */
  const gl = canvas.getContext('webgl', { antialias: true, depth: true });
  if (!gl) {
    alert('WebGL not supported');
    return;
  }

  // Resize canvas to fill window and handle DPR
  function resize() {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const displayWidth = Math.floor(canvas.clientWidth * dpr);
    const displayHeight = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  const roygbivBlue = [0.0, 0.34, 1.0, 1.0];
  gl.clearColor(roygbivBlue[0], roygbivBlue[1], roygbivBlue[2], roygbivBlue[3]);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  // Vertex shader: position only; pass clip-space depth to fragment
  const vsSource = `
    attribute vec3 a_position;
    attribute vec3 a_normal; // not used but reserved for future lighting

    uniform mat4 u_model;
    uniform mat4 u_view;
    uniform mat4 u_proj;

    varying float v_depth;

    void main() {
      vec4 worldPos = u_model * vec4(a_position, 1.0);
      vec4 clipPos = u_proj * u_view * worldPos;
      gl_Position = clipPos;
      // Map clip-space z/w to [0,1] like depth buffer for perspective
      float ndcDepth = clipPos.z / clipPos.w;     // [-1,1]
      v_depth = ndcDepth * 0.5 + 0.5;             // [0,1]
    }
  `;

  // Fragment shader: constant dark gray color
  const fsSource = `
    precision mediump float;
    varying float v_depth; // declared for linkage; not used
    uniform vec3 u_color;  // constant dark gray color
    void main() {
      gl_FragColor = vec4(u_color, 1.0);
    }
  `;

  function compile(type, src){
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(s);
      gl.deleteShader(s);
      throw new Error('Shader compile failed: ' + info);
    }
    return s;
  }

  function makeProgram(vs, fs){
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(p);
      gl.deleteProgram(p);
      throw new Error('Program link failed: ' + info);
    }
    return p;
  }

  const program = makeProgram(compile(gl.VERTEX_SHADER, vsSource), compile(gl.FRAGMENT_SHADER, fsSource));
  gl.useProgram(program);

  const attribs = {
    position: gl.getAttribLocation(program, 'a_position'),
    normal: gl.getAttribLocation(program, 'a_normal')
  };
  const uniforms = {
    model: gl.getUniformLocation(program, 'u_model'),
    view: gl.getUniformLocation(program, 'u_view'),
    proj: gl.getUniformLocation(program, 'u_proj'),
    color: gl.getUniformLocation(program, 'u_color')
  };

  // Set constant dark gray color (#1e1e1e)
  const darkGray = new Float32Array([30/255, 30/255, 30/255]);
  gl.uniform3fv(uniforms.color, darkGray);

  // Cube geometry (positions and indices)
  const positions = new Float32Array([
    // Front
    -1, -1,  1,
     1, -1,  1,
     1,  1,  1,
    -1,  1,  1,
    // Back
    -1, -1, -1,
    -1,  1, -1,
     1,  1, -1,
     1, -1, -1,
    // Top
    -1,  1, -1,
    -1,  1,  1,
     1,  1,  1,
     1,  1, -1,
    // Bottom
    -1, -1, -1,
     1, -1, -1,
     1, -1,  1,
    -1, -1,  1,
    // Right
     1, -1, -1,
     1,  1, -1,
     1,  1,  1,
     1, -1,  1,
    // Left
    -1, -1, -1,
    -1, -1,  1,
    -1,  1,  1,
    -1,  1, -1,
  ]);

  // Simple normals per vertex (not used for this shader but included)
  const normals = new Float32Array([
    // Front
     0,  0,  1,
     0,  0,  1,
     0,  0,  1,
     0,  0,  1,
    // Back
     0,  0, -1,
     0,  0, -1,
     0,  0, -1,
     0,  0, -1,
    // Top
     0,  1,  0,
     0,  1,  0,
     0,  1,  0,
     0,  1,  0,
    // Bottom
     0, -1,  0,
     0, -1,  0,
     0, -1,  0,
     0, -1,  0,
    // Right
     1,  0,  0,
     1,  0,  0,
     1,  0,  0,
     1,  0,  0,
    // Left
    -1,  0,  0,
    -1,  0,  0,
    -1,  0,  0,
    -1,  0,  0,
  ]);

  const indices = new Uint16Array([
    0,1,2,   0,2,3,      // front
    4,5,6,   4,6,7,      // back
    8,9,10,  8,10,11,    // top
    12,13,14,12,14,15,   // bottom
    16,17,18,16,18,19,   // right
    20,21,22,20,22,23    // left
  ]);

  function bufferAttribute(data, attribLocation, size){
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(attribLocation);
    gl.vertexAttribPointer(attribLocation, size, gl.FLOAT, false, 0, 0);
    return buffer;
  }

  bufferAttribute(positions, attribs.position, 3);
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(attribs.normal);
  gl.vertexAttribPointer(attribs.normal, 3, gl.FLOAT, false, 0, 0);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  // Matrices
  function perspective(fovyRad, aspect, near, far){
    const f = 1.0 / Math.tan(fovyRad / 2);
    const rangeInv = 1.0 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, (2 * near * far) * rangeInv, 0,
    ]);
  }

  function lookAt(eye, center, up){
    const zx = eye[0] - center[0];
    const zy = eye[1] - center[1];
    const zz = eye[2] - center[2];
    const zLen = Math.hypot(zx,zy,zz) || 1;
    const zxN = zx / zLen, zyN = zy / zLen, zzN = zz / zLen;

    const xx = up[1]*zzN - up[2]*zyN;
    const xy = up[2]*zxN - up[0]*zzN;
    const xz = up[0]*zyN - up[1]*zxN;
    const xLen = Math.hypot(xx,xy,xz) || 1;
    const x0 = xx/xLen, x1 = xy/xLen, x2 = xz/xLen;

    const y0 = zyN*x2 - zzN*x1;
    const y1 = zzN*x0 - zxN*x2;
    const y2 = zxN*x1 - zyN*x0;

    return new Float32Array([
      x0, y0, zxN, 0,
      x1, y1, zyN, 0,
      x2, y2, zzN, 0,
      -(x0*eye[0] + x1*eye[1] + x2*eye[2]),
      -(y0*eye[0] + y1*eye[1] + y2*eye[2]),
      -(zxN*eye[0] + zyN*eye[1] + zzN*eye[2]),
      1,
    ]);
  }

  function multiply(a,b){
    const out = new Float32Array(16);
    for (let r=0;r<4;r++){
      for (let c=0;c<4;c++){
        out[c + r*4] = a[r*4+0]*b[c+0] + a[r*4+1]*b[c+4] + a[r*4+2]*b[c+8] + a[r*4+3]*b[c+12];
      }
    }
    return out;
  }

  function rotationY(angle){
    const c = Math.cos(angle), s = Math.sin(angle);
    return new Float32Array([
      c, 0, -s, 0,
      0, 1,  0, 0,
      s, 0,  c, 0,
      0, 0,  0, 1,
    ]);
  }

  function rotationX(angle){
    const c = Math.cos(angle), s = Math.sin(angle);
    return new Float32Array([
      1, 0, 0, 0,
      0, c, s, 0,
      0,-s, c, 0,
      0, 0, 0, 1,
    ]);
  }

  // Animation loop
  let lastTime = 0;
  function render(timeMs){
    resize();
    const t = timeMs * 0.001; // seconds

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const aspect = canvas.width / Math.max(1, canvas.height);
    const proj = perspective(Math.PI/2, aspect, 0.1, 100.0); // 90deg fov
    const view = lookAt([0, 0, 5], [0, 0, 0], [0, 1, 0]);

    // Rotate 1/8 turn per second clockwise around Y axis only
    const rotY = rotationY(-t * (Math.PI/4));
    const model = rotY;

    gl.uniformMatrix4fv(uniforms.model, false, model);
    gl.uniformMatrix4fv(uniforms.view, false, view);
    gl.uniformMatrix4fv(uniforms.proj, false, proj);

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    lastTime = t;
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  window.addEventListener('resize', resize);
})();

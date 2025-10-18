(() => {
  const canvas = document.getElementById('glcanvas');
  const gl2 = canvas.getContext('webgl2');
  const gl = gl2 || canvas.getContext('webgl');
  if (!gl) {
    alert('WebGL not supported');
    return;
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayW = Math.floor(canvas.clientWidth * dpr);
    const displayH = Math.floor(canvas.clientHeight * dpr);
    if (canvas.width !== displayW || canvas.height !== displayH) {
      canvas.width = displayW;
      canvas.height = displayH;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Shader compile failed: ' + info);
    }
    return shader;
  }

  function createProgram(gl, vsSource, fsSource) {
    const program = gl.createProgram();
    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error('Program link failed: ' + info);
    }
    gl.detachShader(program, vs);
    gl.detachShader(program, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return program;
  }

  function perspectiveMatrix(fovYRadians, aspect, near, far) {
    const f = 1.0 / Math.tan(fovYRadians / 2);
    const rangeInv = 1.0 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, (2 * near * far) * rangeInv, 0,
    ]);
  }

  function multiplyMat4(a, b) {
    const out = new Float32Array(16);
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    const b00 = b[0], b01 = b[1], b02 = b[2], b03 = b[3];
    const b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7];
    const b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11];
    const b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];

    out[0]  = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
    out[1]  = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
    out[2]  = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
    out[3]  = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;

    out[4]  = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
    out[5]  = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
    out[6]  = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
    out[7]  = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;

    out[8]  = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
    out[9]  = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;

    out[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
    out[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
    out[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
    out[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;
    return out;
  }

  function rotationX(a) {
    const c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ]);
  }

  function rotationY(a) {
    const c = Math.cos(a), s = Math.sin(a);
    return new Float32Array([
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ]);
  }

  function translationMatrix(x, y, z) {
    return new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1,
    ]);
  }

  const isWebGL2 = !!gl2;

  const vsSource = isWebGL2 ? `#version 300 es\nprecision highp float;\nlayout(location=0) in vec3 a_position;\nuniform mat4 u_mvp;\nvoid main(){ gl_Position = u_mvp * vec4(a_position,1.0); }` : `attribute vec3 a_position;\nuniform mat4 u_mvp;\nvoid main(){ gl_Position = u_mvp * vec4(a_position,1.0); }`;

  const fsSource = isWebGL2 ? `#version 300 es\nprecision mediump float;\nout vec4 o_color;\nvoid main(){ float d = gl_FragCoord.z; o_color = vec4(vec3(d),1.0); }` : `precision mediump float;\nvoid main(){ float d = gl_FragCoord.z; gl_FragColor = vec4(vec3(d),1.0); }`;

  const program = createProgram(gl, vsSource, fsSource);
  gl.useProgram(program);

  const positions = new Float32Array([
    -1, -1,  1,
     1, -1,  1,
     1,  1,  1,
    -1,  1,  1,
    -1, -1, -1,
     1, -1, -1,
     1,  1, -1,
    -1,  1, -1,
  ]);

  const indices = new Uint16Array([
    0, 1, 2,  0, 2, 3,
    1, 5, 6,  1, 6, 2,
    5, 4, 7,  5, 7, 6,
    4, 0, 3,  4, 3, 7,
    4, 5, 1,  4, 1, 0,
    3, 2, 6,  3, 6, 7,
  ]);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  const aPositionLoc = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(aPositionLoc);
  gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);

  const uMvpLoc = gl.getUniformLocation(program, 'u_mvp');

  gl.clearColor(0.1, 0.3, 0.9, 1.0); // blue background
  gl.enable(gl.DEPTH_TEST);

  function render(timeMs) {
    const seconds = timeMs * 0.001;
    const angle = -(Math.PI / 4) * seconds; // clockwise, 0.125 turns/sec

    resizeCanvas();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const aspect = canvas.width / canvas.height;
    const projection = perspectiveMatrix((90 * Math.PI) / 180, aspect, 0.1, 100.0);
    const view = translationMatrix(0, 0, -6);
    const model = multiplyMat4(rotationX((25 * Math.PI) / 180), rotationY(angle));
    const mv = multiplyMat4(view, model);
    const mvp = multiplyMat4(projection, mv);

    gl.uniformMatrix4fv(uMvpLoc, false, mvp);

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(render);
})();

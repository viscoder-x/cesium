/*global define*/
define([
        'Core/clone',
        'Core/defaultValue',
        'Core/defined',
        'Core/queryToObject',
        'Renderer/Context',
        'Specs/createCanvas',
        'Specs/createFrameState',
        'Specs/destroyCanvas'
    ], function(
        clone,
        defaultValue,
        defined,
        queryToObject,
        Context,
        createCanvas,
        createFrameState,
        destroyCanvas) {
    'use strict';

    function createContext(options, canvasWidth, canvasHeight) {
        // clone options so we can change properties
        options = clone(defaultValue(options, {}));
        options.webgl = clone(defaultValue(options.webgl, {}));
        options.webgl.alpha = defaultValue(options.webgl.alpha, true);
        options.webgl.antialias = defaultValue(options.webgl.antialias, false);
        options.webglStub = !!window.webglStub;

        var canvas = createCanvas(canvasWidth, canvasHeight);
        var context = new Context(canvas, options);

        var parameters = queryToObject(window.location.search.substring(1));
        if (defined(parameters.webglValidation)) {
            context.validateShaderProgram = true;
            context.validateFramebuffer = true;
            context.logShaderCompilation = true;
            context.throwOnWebGLError = true;
        }

        var us = context.uniformState;
        us.update(createFrameState(context));

        // Add function for test
        context.destroyForSpecs = function() {
            destroyCanvas(context.canvas);
            return context.destroy();
        };

        return context;
    }

    return createContext;
});

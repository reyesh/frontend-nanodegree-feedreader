module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

        jshint: {
          files: {
            src: ['Gruntfile.js','js/app.js','jasmine/spec/feedreader.js']
          }
        }        

	});

    grunt.registerTask('default', ['jshint']);
};
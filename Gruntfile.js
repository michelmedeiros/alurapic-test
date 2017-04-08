module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'tests/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        cucumberjs: {
            options: {
                format: 'html',
                debug: 'true',
                output: 'tests/reports/my_report.html',
                theme: 'bootstrap'
            },
            features: ['tests/features/novaFoto.feature']
        }
    });

    gulp.task('test', () => {
        var params = process.argv;
        var args = [];
        for (var i = 0; i < params.length; i++) {
            if (params[i].substring(0, 2) == '--') args.push(params[i]);
        }

        return gulp.src([])
            .pipe(protractor({
                configFile: './protractor.conf.js',
                args: args
            }))
            .on('error', onError);
    });

    grunt.loadNpmTasks('grunt-cucumberjs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jshint']);

};

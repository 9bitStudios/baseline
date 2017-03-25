module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify:{
            dist:{
                options:{
                    transform:[
                        ['babelify', { presets: ["es2015", "react"] }]
                    ]
                },
                src: ['src/js/Baseline.js'],
                dest: 'src/Baseline.js'
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: [
                    'src/Baseline.js'
                ],
                dest: 'dist/js/baseline.js'
            }
        },                
        sass: {
            dist: {
                files: {
                    'dist/css/baseline.css': 'src/scss/baseline.scss'
                }
            }
        },
        cssmin: {
            add_banner: {
                files: [{ expand: true, cwd: 'dist/css/', src: ['baseline.css'], dest: 'dist/css/', ext: '.min.css' }]
            }
        },   
        uglify: {
            build: {
                src: 'dist/js/baseline.js',
                dest: 'dist/js/baseline.min.js'
            }
        },
        clean: {
            build: {
              src: ['.sass-cache/', 'dist/css/*.css.map', 'src/Baseline.js']
            }
        },                 
        watch: {         
            scripts: {
                files: ['src/js/*.js'],
                options: {
                    interrupt: true
                },
                tasks: ['browserify', 'concat', 'uglify', 'clean']
            },            
            css: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass', 'cssmin', 'clean']
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['watch']);
};
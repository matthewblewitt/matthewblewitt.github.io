/** 
* Grunt Boilerplate
*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    imagemin: {
      dist: {
        options: {
          cache: false
        },
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },

    jshint: {
      all: 'js/*.js'
    },

    // sass: {
    //   dist: {
    //     options: {
    //       style: 'nested'
    //     },
    //     files: {
    //       'css/main.css': 'css/main.scss'
    //     }
    //   }
    // },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'css/',
          cssDir: 'css/',
          environment: 'production'
        }
      }
    },

    autoprefixer: {
      dist: {
        files: {
          'css/main.auto.css': 'css/main.css'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },

      js: {
        files: 'js/**/*.js',
        tasks: ['jshint'],
        options: {
          spawn: false,
        }
      },

      css: {
        //directory path and it's subdirectories,
        files: ['css/**/**/*.scss'],
        tasks: ['compass', 'autoprefixer'],
        options: {
          spawn: false,
        }
      },

      images: {
        files: ['images/**/*.{png,jpg,gif}'],
        tasks: ['images'],
        options: {
          spawn: false,
        }
      },

      html:{
        files: ['./**/*.html'],
        tasks: [],
        options: {
          spawn: false
        }
      }
    },

    server: {
      options: {
        port: 4000,      
        base: './'
      }
    },

  });

  // Load the plugin(s).
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', [
    'imagemin',
    //'jshint',
    //'sass',
    'compass',
    'autoprefixer',
    'watch',
    'connect'
  ]);
  // grunt.registerTask('dev', []); Look into DEV register task

};

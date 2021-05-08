module.exports = function (grunt) {
    const addEquipmentDirPath = './addEquipment/';

    const scWebDirPath = '../../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            addEquipment: {
                src: [addEquipmentDirPath + 'src/*.js'],
                dest: addEquipmentDirPath + 'static/js/addEquipment.js'
            },
        },
        copy: {
            addEquipmentJs: {
                cwd: addEquipmentDirPath + 'static/js/',
                src: 'addEquipment.js',
                dest: clientJsDirPath + 'addEquipment/',
                expand: true,
                flatten: true
            },
            addEquipmentCss: {
                cwd: addEquipmentDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            addEquipmentHtml: {
                cwd: addEquipmentDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            
        },
        watch: {
            addEquipmentJs: {
                files: addEquipmentDirPath + 'src/**',
                tasks: ['concat:addEquipment', 'copy:addEquipmentJs'],
            },
            addEquipmentCss: {
                files: addEquipmentDirPath + 'static/css/**',
                tasks: ['copy:addEquipmentCss'],
            },
            addEquipmentHtml: {
                files: [addEquipmentDirPath + 'static/html/**'],
                tasks: ['copy:addEquipmentHtml'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};

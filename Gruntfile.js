module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {      
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch :{
            less :{
                files :['src/styles/**/*.less'],     // -> /** : acessa qualquer pasta dentro de styles e /* qualquer arquivo dentro de qualquer pasta
                tasks :[ 'less:development']
            },
            html:{
                files:['src/index.html'],
                tasks:['replace:dev']
            }
        },
        replace:{
            dev :{
                options :{
                    patterns:[
                        {
                            match : 'ENDERECO_DO_CSS' , //palavra a ser encontrada
                            replacement: './styles/main.css' 
                        },
                        {
                            match : 'ENDERECO_DO_JS' , //palavra a ser encontrada
                            replacement: './styles/main.css' 
                        }
                    ]     // um array que vai conter as palavras que desejamos que o plugins faça o replace  -> encontra palavra e troca pelo valor que definimos
                },
                files:[   // foi colocado de maneira que a identação fique com o options
                    {
                        expand : true,
                        flatte:true,
                        src:['src/index.html'],  //arquivo raiz para a substituição
                        dest:'dev/'
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options :{
                    removeComments:true,
                    collapseWhitespace:true, // todo espaço em branco é apagado
                },
                files:{
                    'prebuild/index.hmtl': 'src/index.html'

                }
            }
        },
        clean:['prebuild']

    })

    // Carrega o plugin Grunt-contrib-less
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-clean')



    // Registra as tarefas Grunt
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production','htmlmin:dist','replace','clean']);
};  

// comando npm run build Quando você executa npm run build, o npm procura pelo script "build" no arquivo package.json e executa o comando associado a ele. 
//no package.json o build esta no script --> "build": "grunt build" module.exports = function (grunt) {

# modules
require 'bootstrap/dist/css/bootstrap-grid.min.css'
require 'semantic-ui-css/semantic.min.js'
require 'semantic-ui-css/semantic.min.css'

# our code
require './app.styl'
require './index.pug'

# our js code
$ document .ready ->
  $ \.ui.checkbox .checkbox!
  $ \form .on \submit ->
    it.prevent-default!
    $ \.modal .modal! .modal \show

# vi:et:nowrap:sw=2:ts=2

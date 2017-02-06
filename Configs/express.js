/**
 * Created by Rohail Najam on 2/6/2017.
 */

module.exports = function ({app, config,express,cors,bodyParser,morgan}) {
  app.use(cors());
  app.use(morgan(config.logStyle));
  app.use(bodyParser.json({limit : '10mb'}));
  app.use(bodyParser.urlencoded({limit : '10mb',extended :true}));
  app.use(express.static('public'));
};
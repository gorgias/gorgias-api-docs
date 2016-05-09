
import openapi from './openapi_json';
import _ from 'underscore';

var definitions = openapi.definitions; 
var paths = openapi.paths; 

/* 
  create function createExample : replace type string by "a string", type "date-time" by a random date, etc...
*/
var createExample = function(object){
  var example = {};
  for( var key in object){
    if( object[key]["type"] == "string"  &&  object[key]["format"] == "date-time"  ){
        example[key] = "2016-05-08T05:02:04.221Z"; /* example of date */
    }
    else if(  object[key]["type"] == "string"  ){
       example[key] = "a string";
    }
    else if( object[key]["type"] == "integer" ){
        example[key] = 42 ;
    }
    else if( !object[key]["type"]  && object[key]["$ref"] ){
        var ref = object[key]["$ref"];
        ref = ref.substring(14); 
        /*
        var insideObject = createExample( definitions[ref]["properties"] );
        example[key] = insideObject ; 
        */
        example[key] = "{ Object: ".concat( ref, " }");
    }
    else if (object[key]["type"] == "array" ) {
        var insideType = object[key]["items"]["type"]; /* to finish !!! */
        var arrayString =  "[".concat("insideType", ",\n...\n]");
        
        example[key] = arrayString ;
    }
    else{
        example[key] = "..." ;
    }
  }
  return example;
}


/* 
  create array "examples" containing examples of responses for each object
  var examples = [ 
      { 
        objectName: "Action",
        example: {
            "arguments": "string",
            "created_datetime": "2016-05-08T05:02:04.221Z",
            "deleted_datetime": "2016-05-08T05:02:04.221Z",
            "description": "string",
            "id": 0,
            ...
        },
      },
      ...
  ]
*/
var examples = []
for(var definition in definitions ) {
    var example = {};
    example["objectName"] = definition ;
    example["example"] = createExample(definitions[definition]["properties"]); 
    examples.push(example);
}






/* 
  create array "tagNames" containing all the tagNames 
  var tagNames = ["Settings","User","Integration",... ]
*/
var tagNames = []
for(var endpoint in paths ) {
  for(var verb in paths[endpoint] ) {
      var tagName =  paths[endpoint][verb]["tags"][0];
      if ( _.contains( tagNames, tagName ) == false ){
          tagNames.push(tagName );
      }
   }
}




/* 
  create array "tags" described at the top 
  var tags = [ 
          {
              tagName:"Action", 
              tagPaths:[
                  {
                      verb: "get", 
                      endpoint:"/api/actions", 
                      object:{ }
                  }, 
                  ...
              ]
          },
          ... 
      ]
*/
var tags = [];
for ( var i in tagNames){

    var tag = {};
    tag["tagName"] = tagNames[i] ;

    /* create array "tagPaths" containing all the Paths (endpoint+verb) for a specific tag */
    var tagPaths = [];
    for(var endpoint in paths ) {
      for(var verb in paths[endpoint] ) {
          if ( paths[endpoint][verb]["tags"][0] == tagNames[i] ){
            var tagPath = {};
            tagPath["verb"] = verb;
            tagPath["endpoint"] = endpoint;
            tagPath["object"] = paths[endpoint][verb];
            tagPaths.push(tagPath);
          }
        }
    }
    tag["tagPaths"] = tagPaths ;
    tags.push(tag);

}


module.exports = {
    examples: examples,
    tagNames: tagNames,
    tags: tags
};



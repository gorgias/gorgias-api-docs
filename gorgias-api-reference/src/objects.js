
import _ from 'underscore';
var openapi = require("json!./openapi.json");

/* contain the descriptions of the objects of the API ( "Account", "AccountMeta", "Action", ...) */
var definitions = openapi.definitions;
/* contain all the descriptions endpoints of the API ("/api/actions/", "/api/actions/{id}/", ...) */
var paths = openapi.paths; 

/* create array "tagNames" containing all the names of the tags : var tagNames = ["Action","Event","Integration","Rule","Settings","Ticket","TickeMessage","User", "Widget", WidgetFields" ] */
var tagNames = []
for(var endpoint in paths ) {
  for(var verb in paths[endpoint] ) {
      var tagName =  paths[endpoint][verb]["tags"][0];
      if ( _.contains( tagNames, tagName ) == false ){
          tagNames.push(tagName );
      }
   }
}

/* create array "otherObjects" containing all the objects which are not already in the tagNames array */
var otherDefinitions = []
for(var definition in definitions ) {
    if ( _.contains( tagNames, definition ) == false ){
        otherDefinitions.push(definition );
    }
}




/* function which renders the array of dependencies for each object : "objectName" -> ["objectName","objectName"]  */
var getDependencies = function(objectName){
  var dependencies = [];
  if( definitions[objectName] ){
    var object = definitions[objectName]["properties"];
    for( var key in object){
      if( !object[key]["type"]  && object[key]["$ref"] ){
          var ref = object[key]["$ref"];
          var objectName = ref.substring(14); 
          dependencies.push(objectName);
      }
      if ( object[key]["type"] == "array" && object[key]["items"]["$ref"] ){
          var ref = object[key]["items"]["$ref"];
          var objectName = ref.substring(14); 
          dependencies.push(objectName);
      }
    }
  }
  return dependencies;
}





/* array of examples : {"objectName": objectExample, ... } */
var examplesList ={};

// commence par UserAuth, AccountMeta, Attachment
//User (, UserChannel, Group, Organization, Role) , UserConnection, WidgetFieldValue, Decoration, WidgetField, Widget, 


/*  create function createExample : replace type string by "a string", integer by a specific integer, type "date-time" by a specific date, etc... */
var createExample = function(objectName){
  var example = {};
  if( definitions[objectName] ){
  var object = definitions[objectName]["properties"];
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
    else if( object[key]["type"] == "boolean" ){
        example[key] = true ;
    }
    else if (object[key]["type"] == "array" && object[key]["items"]["type"] ) {
        var insideType = object[key]["items"]["type"]; 
        var arrayString =  []; 
        arrayString.push(insideType);
        arrayString.push("...");
        example[key] = arrayString ;
    }
    else if( !object[key]["type"]  && object[key]["$ref"] ){
        var ref = object[key]["$ref"];
        var objectName = ref.substring(14); 
        if( examplesList[objectName] != null ){
            example[key] = examplesList[objectName];
        }
        else{
            example[key] = objectName;
        }
    }
    else if ( object[key]["type"] == "array" && object[key]["items"]["$ref"] ){
        var ref = object[key]["items"]["$ref"];
        var objectName = ref.substring(14); 
        var arrayString =  []; 
        if( examplesList[objectName] != null ){
             arrayString.push(examplesList[objectName]);
        }
        else{
            arrayString.push(objectName);
        }
        arrayString.push("...");
        example[key] = arrayString ;
    }
    else{
        example[key] = "..." ;
    }
  }
  // examplesList[objectName] = example;
  }
  return example;
}

/* create an array pureObjects containing all the object requiring no other Objects to be defined
var pureObjects = [];
for ( var object in definitions ){
  var pureObject = true;
  var properties = definitions[object]["properties"];
  for( var key in properties){
    if( !properties[key]["type"]  && properties[key]["$ref"] ){
        pureObject = false;
    }
    if (properties[key]["type"] == "array" && properties[key]["items"]["$ref"] ) {
        pureObject = false;
    }
  }
  if (pureObject){
    pureObjects.push(object);
  }
}

*/

/* we iterate on the pureObjects to fill a first time the examplesList 
for(var i in pureObjects ) {
    var example = createExample(pureObjects[i]); 
}
*/

/* we iterate on the tagNames to fill a second time the examplesList 
for(var i in tagNames ) {
    var example = createExample(tagNames[i]); 
}
*/






/* return the status success number in function of the verb (get, post, put, delete) */
var responseStatus = function(verb){
    var status;
    switch(verb){
      case "get":
        status = "200";
        break;
      case "post":
        status = "201";
        break;
      case "put":
        status = "202";
        break;
      case "delete":
        status = "204";
        break;
    }
    return status;
}



/* 
  create array "tags":
  var tags = [ 
          {
              tagName:"Action", 
              tagDependencies: ["ObjectName","ObjectName",...],
              tagPaths:[
                  {
                      verb: "GET", 
                      endpoint:"/api/actions", 
                      object:{  
                          "description": "Get an action based on {id}",
                          ...
                      }, 
                      responseStatus:200,
                      responseExample:{ 
                          "arguments": "a string",
                          ...
                      }
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
    tag["tagDependencies"] = getDependencies(tagNames[i]);
    // console.log("tagDependencies", getDependencies(tagNames[i]) );
    /* create array "tagPaths" containing all the Paths (endpoint+verb) for a specific tag */
    var tagPaths = [];
    for(var endpoint in paths ) {
      for(var verb in paths[endpoint] ) {
          if ( paths[endpoint][verb]["tags"][0] == tagNames[i] ){
            var tagPath = {};
            var status ;
            tagPath["verb"] = verb.toUpperCase();
            tagPath["endpoint"] = endpoint;
            tagPath["object"] = paths[endpoint][verb];
            status = responseStatus(verb);
            tagPath["responseStatus"] =status;
            var responseExample  = "";
            var schema = paths[endpoint][verb]["responses"][status]["schema"];
            if(  schema != null ){
              if( schema["type"] == "array"){
                var responseString = schema["items"]["$ref"];
                responseString = responseString.substring(14);
                if( responseExample != null ){
                    responseExample = createExample(responseString);
                }
                responseExample = JSON.stringify(responseExample,null, 2);
                responseExample =  "[".concat(responseExample, ",\n...\n]");
              }
              else{
                var responseString = schema["$ref"];
                responseString = responseString.substring(14); 
                if( responseString != null ){
                  responseExample = createExample(responseString);
                }
                responseExample = JSON.stringify(responseExample,null, 2);
              }
            }
            else{
              responseExample = paths[endpoint][verb]["responses"][status]["description"] ;
            }
            tagPath["responseExample"] = responseExample;
            tagPaths.push(tagPath);
          }
        }
    }
    tag["tagPaths"] = tagPaths ;
    tags.push(tag);
    // console.log("examplesList", examplesList);
}


module.exports = {
    openapi: openapi,
    tagNames: tagNames,
    otherDefinitions: otherDefinitions,
    tags: tags
};



















/* create an array pureObjects containing all the object requiring no other Objects to be defined 
var insideObjects = [];
for ( var i in tagNames){
  for(var endpoint in paths ) {
    for(var verb in paths[endpoint] ) {
      if ( paths[endpoint][verb]["tags"][0] == tagNames[i] ){
        var status = responseStatus(verb);
        var schema = paths[endpoint][verb]["responses"][status]["schema"];
        if(  schema != null ){
          var objectName;
          if( schema["type"] == "array"){
            objectName = schema["items"]["$ref"];
            objectName = objectName.substring(14);
          }
          else{
            objectName = schema["$ref"];
            objectName = objectName.substring(14); 
          }
          insideObjects.push(objectName);
        }
      }
    }
  }
}
var insideObjects = _.uniq(insideObjects);


/* filter insideObjects to check if it needs an other object 
var filteredInsideObjects = [];
for ( var i in insideObjects){
  var objectName = insideObjects[i];
  var noInsideObjects = true;
  var object = definitions[objectName]["properties"];
  for( var key in object){
    if( !object[key]["type"]  && object[key]["$ref"] ){
        noInsideObjects = false;
    }
    if (object[key]["type"] == "array" && object[key]["items"]["$ref"] ) {
        noInsideObjects = false;
    }
  }
  if (noInsideObjects ){
    filteredInsideObjects.push(objectName);
  }
}
*/

/*
for(var definition in definitions ) {
    var example = createExample(definition); 
}
for(var definition in definitions ) {
    var example = createExample(definition); 
}
for(var definition in definitions ) {
    var example = createExample(definition); 
}*/






/*
var insideExamples = [];
for ( var i in insideObjects){
  var insideExample = {};
  var objectName = insideObjects[i];
  insideExample["objectName"] = objectName;
  
  insideExample["objectExample"] =  createExample(objectName);

  insideExamples.push(insideExample);
}
*/




/* create an array insideObjects containing all the object nested 
var insideObjects = [];
for ( var i in tagNames){
  for(var endpoint in paths ) {
    for(var verb in paths[endpoint] ) {
      if ( paths[endpoint][verb]["tags"][0] == tagNames[i] ){
        var status = responseStatus(verb);
        var schema = paths[endpoint][verb]["responses"][status]["schema"];
        if(  schema != null ){
          var objectName;
          if( schema["type"] == "array"){
            objectName = schema["items"]["$ref"];
            objectName = objectName.substring(14);
          }
          else{
            objectName = schema["$ref"];
            objectName = objectName.substring(14); 
          }
          insideObjects.push(objectName);
        }
      }
    }
  }
}
var insideObjects = _.uniq(insideObjects);
*/

/* filter insideObjects to check if it needs an other object 
var filteredInsideObjects = [];
for ( var i in insideObjects){
  var objectName = insideObjects[i];
  var noInsideObjects = true;
  var object = definitions[objectName]["properties"];
  for( var key in object){
    if( !object[key]["type"]  && object[key]["$ref"] ){
        noInsideObjects = false;
    }
    if (object[key]["type"] == "array" && object[key]["items"]["$ref"] ) {
        noInsideObjects = false;
    }
  }
  if (noInsideObjects ){
    filteredInsideObjects.push(objectName);
  }
}
*/



/* array of examples 
var examples = []
for(var definition in definitions ) {
    var example = {};
    example["objectName"] = definition ;
    example["example"] = createExample(definition); 
    examples.push(example);
}

*/




 // nonNestedObjects: nonNestedObjects,
    // nestedObjects: nestedObjects,
    // nonNestedExamples: nonNestedExamples,
    // nestedExamples: nestedExamples,
    // examples: examples,





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

var examples = []
for(var definition in definitions ) {
    var example = {};
    example["objectName"] = definition ;
    example["example"] = createExample(definitions[definition]["properties"]); 
    examples.push(example);
}
*/





/* 
l'ensemble des objets sont les différents Tags
*/

/* 

pour créer l'ensemble des exemples on peut faire une boucle while et on itère: 
on commence par recenser les non nested objects
on recense tous les reponse objects 
on parcourt d'abord l'intersections des deux et on construit les examples correspondant, 

*/

/* 
objets qui sont requis : User, Group, TicketMessage, Decoration, WidgetFieldValue
(TicketMessage requiert Macro et Attachment et User)

nonNestedObjects ["AccountMeta", "Attachment", "Decoration", "Event", "Group", "IntegrationMapping", "Organization", "Role", "Rule", "Tag", "User", "UserAuth", "UserConnection", "WidgetFieldValue"]
*/


/* 
  create an array containing all the responses objects

var responseObjects = []
for(var endpoint in paths ) {
    for(var verb in paths[endpoint] ) {
      var responseObject =  paths[endpoint][verb]["tags"][0];
      if ( _.contains( responseObjects, responseObject ) == false ){
          responseObjects.push(responseObject );
      }
   }
}
*/



/* 
  check if the object is Nested 

var isNested = function( objectName ){
    var bool = false;
    for( var key in definitions[objectName]["properties"]){
        if( definitions[objectName]["properties"][key]["$ref"] != null ){
          bool = true;
        }
    }
    return bool;
}

*/


/* 
  create an array "nonNestedExamples" containing examples of non Nested objects (ie which property types is not an object)


var nestedObjects = []
var nonNestedObjects = []
for(var definition in definitions ) {
    // var nonNestedExample = {};
    // nonNestedExample["objectName"] = definition ;
    var nested = isNested( definition);
    // console.log('nested', nested);
    if (nested == false){
         // nonNestedExample["example"] = createExample(definitions[definition]["properties"]); 
        // nonNestedExamples.push(nonNestedExample);
        nonNestedObjects.push(definition);
    }
    else{
        nestedObjects.push(definition);
    }
}
*/



/* 
var nonNestedExamples = []
for(var definition in definitions ) {
    var nonNestedExample = {};
    nonNestedExample["objectName"] = definition ;
    nonNestedExample["example"] = createExample(definitions[definition]["properties"]); 
    nonNestedExamples.push(example);
}

var nestedExamples = []
for(var definition in definitions ) {
    var nestedExample = {};
    nestedExample["objectName"] = definition ;
    nestedExample["example"] = createExample(definitions[definition]["properties"]); 
    nestedExamples.push(example);
}
*/





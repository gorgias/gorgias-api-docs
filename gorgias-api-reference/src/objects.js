import _ from 'underscore';

export const openapi = require("json!./openapi.json");


/* *** the objects of the API ( "Account", "AccountMeta", "Action", ...) *** */
const definitions = openapi.definitions;


/* *** endpoints of the API ("/api/actions/", "/api/actions/{id}/", ...) *** */
const paths = openapi.paths; 


/* *** array "tagNames" containing all the names of the tags : const tagNames = ["Action","Event","Integration","Rule","Settings","Ticket","TickeMessage","User", "Widget", WidgetFields" ] *** */
export const tagNames = []
for(const endpoint in paths ) {
  for(const verb in paths[endpoint] ) {
      const tagName =  paths[endpoint][verb]["tags"][0];
      if ( _.contains( tagNames, tagName ) == false ){
          tagNames.push(tagName );
      }
   }
}


/* *** array "otherObjects" containing all the objects which are not already in the tagNames array *** */
export const otherDefinitions = []
for(const definition in definitions ) {
    if ( _.contains( tagNames, definition ) == false ){
        otherDefinitions.push(definition );
    }
}


/* *** renders the array of dependencies ( = other object as Attributes ) for each object : "objectName" -> ["objectName","objectName"]  */
const getDependencies = function(objectName){
  const dependencies = [];
  if( definitions[objectName] ){
    const object = definitions[objectName]["properties"];
    for( const key in object){
      if( !object[key]["type"]  && object[key]["$ref"] ){
          const ref = object[key]["$ref"];
          const objectName = ref.substring(14); 
          dependencies.push(objectName);
      }
      if ( object[key]["type"] == "array" && object[key]["items"]["$ref"] ){
          const ref = object[key]["items"]["$ref"];
          const objectName = ref.substring(14); 
          dependencies.push(objectName);
      }
    }
  }
  return dependencies;
}


/* *** array of examples : {"objectName": objectExample, ... } *** */
const examplesList ={};

// commence par UserAuth, AccountMeta, Attachment
//User (, UserChannel, Group, Organization, Role) , UserConnection, WidgetFieldValue, Decoration, WidgetField, Widget, 


/*  create function createExample : replace type string by "a string", integer by a specific integer, type "date-time" by a specific date, etc... */
const createExample = function(objectName){
  const example = {};
  if( definitions[objectName] ){
    const object = definitions[objectName]["properties"];
    for( const key in object){
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
          const insideType = object[key]["items"]["type"]; 
          const arrayString =  []; 
          arrayString.push(insideType);
          arrayString.push("...");
          example[key] = arrayString ;
      }
      else if( !object[key]["type"]  && object[key]["$ref"] ){
          const ref = object[key]["$ref"];
          const objectName = ref.substring(14); 
          if( examplesList[objectName] != null ){
              example[key] = examplesList[objectName];
          }
          else{
              example[key] = objectName;
          }
      }
      else if ( object[key]["type"] == "array" && object[key]["items"]["$ref"] ){
          const ref = object[key]["items"]["$ref"];
          const objectName = ref.substring(14); 
          const arrayString =  []; 
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



/* *** return the status success number in function of the verb (get, post, put, delete) *** */
const responseStatus = function(verb){
    let status;
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



/* ***
  create array "tags":
  const tags = [ 
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
*** */
export const tags = [];
for ( const i in tagNames){
    const tag = {};
    tag["tagName"] = tagNames[i] ;
    tag["tagDependencies"] = getDependencies(tagNames[i]);
    const tagPaths = [];
    for(const endpoint in paths ) {
      for(const verb in paths[endpoint] ) {
          if ( paths[endpoint][verb]["tags"][0] == tagNames[i] ){
            const tagPath = {};
            tagPath["verb"] = verb.toUpperCase();
            tagPath["endpoint"] = endpoint;
            tagPath["object"] = paths[endpoint][verb];
            const status = responseStatus(verb);
            tagPath["responseStatus"] =status;
            let responseExample  = "";
            const schema = paths[endpoint][verb]["responses"][status]["schema"];
            if(  schema != null ){
              if( schema["type"] == "array"){
                const responseString = schema["items"]["$ref"].substring(14);
                if( responseExample != null ){
                    responseExample = createExample(responseString);
                }
                responseExample = JSON.stringify(responseExample,null, 2);
                responseExample =  "[".concat(responseExample, ",\n...\n]");
              }
              else{
                const responseString = schema["$ref"].substring(14);
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
}


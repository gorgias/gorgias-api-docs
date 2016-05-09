
/* orginial json from https://gorgias.gorgias.io/doc/openapi.json    */

const openapi = (
	{
	"definitions": {
		"Account": {
			"properties": {
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"domain": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"meta": {
					"$ref": "#/definitions/AccountMeta"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user_id": {
					"format": "int32",
					"type": "integer"
				}
			},
			"required": [
				"domain"
			],
			"type": "object"
		},
		"AccountMeta": {
			"properties": {
				"algolia_api_key": {
					"type": "string"
				}
			},
			"type": "object"
		},
		"Action": {
			"properties": {
				"arguments": {
					"description": "Functional arguments",
					"type": "string"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"description": {
					"description": "A longer text explaining what the action is supposed to do.",
					"nullable": true,
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"macro": {
					"items": {
						"type": "string"
					},
					"type": "array"
				},
				"name": {
					"description": "System name of the action",
					"type": "string"
				},
				"title": {
					"description": "User defined title of the action",
					"type": "string"
				},
				"type": {
					"description": "Shows if an action is user or system defined",
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"$ref": "#/definitions/User"
				}
			},
			"required": [
				"title",
				"name",
				"arguments"
			],
			"type": "object"
		},
		"Attachment": {
			"properties": {
				"content_type": {
					"type": "string"
				},
				"name": {
					"type": "string"
				},
				"size": {
					"format": "int32",
					"type": "integer"
				},
				"url": {
					"format": "url",
					"type": "string"
				}
			},
			"required": [
				"url",
				"name",
				"size",
				"content_type"
			],
			"type": "object"
		},
		"Decoration": {
			"description": "Decoration is used to decorate fields with icons, colors, etc..",
			"properties": {
				"icon": {
					"description": "HTML element with the icon",
					"type": "string"
				}
			},
			"type": "object"
		},
		"Event": {
			"properties": {
				"context": {
					"format": "int32",
					"type": "integer"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"object_id": {
					"format": "int32",
					"type": "integer"
				},
				"object_type": {
					"type": "string"
				},
				"source": {
					"type": "string"
				},
				"type": {
					"description": "Event types are used to discriminate between events.",
					"meta": {
						"enum": [
							"ticket-created",
							"ticket-updated"
						],
						"operators": {
							"eq": {
								"label": "is"
							},
							"neq": {
								"label": "is not"
							}
						},
						"rules": {
							"widget": "select"
						}
					},
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"type": "string"
				},
				"version": {
					"type": "string"
				}
			},
			"required": [
				"source",
				"type"
			],
			"type": "object"
		},
		"Group": {
			"properties": {
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"description": {
					"type": "string"
				},
				"external_id": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"name": {
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"users": {
					"items": {
						"type": "string"
					},
					"type": "array"
				}
			},
			"type": "object"
		},
		"Integration": {
			"properties": {
				"account": {
					"type": "string"
				},
				"connections": {
					"items": {
						"$ref": "#/definitions/UserConnection"
					},
					"type": "array"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deactivated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"decoration": {
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"description": {
					"type": "string"
				},
				"http": {
					"$ref": "#/definitions/IntegrationHTTP"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"locked_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"mappings": {
					"items": {
						"$ref": "#/definitions/IntegrationMapping"
					},
					"type": "array"
				},
				"meta": {
					"type": "string"
				},
				"name": {
					"type": "string"
				},
				"type": {
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"$ref": "#/definitions/User"
				}
			},
			"required": [
				"name",
				"type",
				"connections"
			],
			"type": "object"
		},
		"IntegrationHTTP": {
			"properties": {
				"form": {
					"type": "string"
				},
				"headers": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"integration": {
					"$ref": "#/definitions/Integration"
				},
				"method": {
					"type": "string"
				},
				"request_content_type": {
					"type": "string"
				},
				"response_content_type": {
					"type": "string"
				},
				"responses_content_type": {
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"url": {
					"type": "string"
				}
			},
			"required": [
				"url"
			],
			"type": "object"
		},
		"IntegrationMapping": {
			"properties": {
				"destination_key": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"integration": {
					"type": "string"
				},
				"order": {
					"format": "int32",
					"type": "integer"
				},
				"source_key": {
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				}
			},
			"type": "object"
		},
		"Macro": {
			"properties": {
				"actions": {
					"items": {
						"$ref": "#/definitions/Action"
					},
					"type": "array"
				},
				"category": {
					"type": "string"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deactivated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"external_id": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"name": {
					"type": "string"
				},
				"ticket_messages": {
					"items": {
						"type": "string"
					},
					"type": "array"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"$ref": "#/definitions/User"
				}
			},
			"required": [
				"name"
			],
			"type": "object"
		},
		"Organization": {
			"properties": {
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"description": {
					"type": "string"
				},
				"external_id": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"name": {
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"url": {
					"type": "string"
				},
				"users": {
					"items": {
						"type": "string"
					},
					"type": "array"
				}
			},
			"type": "object"
		},
		"Role": {
			"properties": {
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"description": {
					"type": "string"
				},
				"external_id": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"name": {
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"users": {
					"items": {
						"type": "string"
					},
					"type": "array"
				}
			},
			"required": [
				"name"
			],
			"type": "object"
		},
		"Rule": {
			"properties": {
				"code": {
					"type": "string"
				},
				"code_ast": {
					"type": "string"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"crontab": {
					"type": "string"
				},
				"deactivated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"description": {
					"type": "string"
				},
				"event_types": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"priority": {
					"format": "int32",
					"type": "integer"
				},
				"title": {
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user_id": {
					"format": "int32",
					"type": "integer"
				}
			},
			"required": [
				"title",
				"code",
				"priority",
				"code_ast"
			],
			"type": "object"
		},
		"Tag": {
			"properties": {
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"name": {
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				}
			},
			"required": [
				"name"
			],
			"type": "object"
		},
		"Ticket": {
			"properties": {
				"assignee_group": {
					"$ref": "#/definitions/Group"
				},
				"assignee_user": {
					"$ref": "#/definitions/User"
				},
				"channel": {
					"meta": {
						"enum": [
							"email",
							"phone",
							"sms",
							"chat",
							"twitter",
							"facebook",
							"api"
						],
						"filters": {
							"widget": "multi-select"
						},
						"operators": {
							"eq": {
								"label": "is"
							},
							"neq": {
								"label": "is not"
							}
						},
						"rules": {
							"widget": "multi-select"
						}
					},
					"type": "string"
				},
				"closed_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"external_id": {
					"type": "string"
				},
				"first_message": {
					"$ref": "#/definitions/TicketMessage",
					"description": "Last message (ordered by `created_datetime` of the TicketMessage). This is a useful shortcut for the ticket list"
				},
				"from_agent": {
					"meta": {
						"operators": {
							"eq": {
								"label": "is"
							},
							"neq": {
								"label": "is not"
							}
						},
						"show": [
							"rules"
						],
						"widget": "select"
					},
					"type": "boolean"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"last_message": {
					"$ref": "#/definitions/TicketMessage",
					"description": "Last message (ordered by `created_datetime` of the TicketMessage). This is a useful shortcut for the rules"
				},
				"messages": {
					"items": {
						"$ref": "#/definitions/TicketMessage"
					},
					"type": "array"
				},
				"meta": {
					"type": "string"
				},
				"opened_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"priority": {
					"description": "Ticket priority shows how important is the ticket",
					"meta": {
						"enum": [
							"low",
							"normal",
							"high",
							"critical"
						],
						"filters": {
							"widget": "select"
						},
						"operators": {
							"eq": {
								"label": "is"
							},
							"neq": {
								"label": "is not"
							}
						},
						"rules": {
							"widget": "select"
						}
					},
					"type": "string"
				},
				"receiver": {
					"$ref": "#/definitions/User"
				},
				"requester": {
					"$ref": "#/definitions/User"
				},
				"sender": {
					"$ref": "#/definitions/User"
				},
				"status": {
					"description": "Ticket status is used for managing the lifecycle of the ticket",
					"meta": {
						"enum": [
							"new",
							"open",
							"closed"
						],
						"filters": {
							"widget": "multi-select"
						},
						"operators": {
							"eq": {
								"label": "is"
							},
							"neq": {
								"label": "is not"
							}
						},
						"rules": {
							"widget": "select"
						}
					},
					"type": "string"
				},
				"subject": {
					"meta": {
						"operators": {
							"contains": {
								"label": "contains"
							},
							"endsWith": {
								"label": "ends with"
							},
							"eq": {
								"label": "is"
							},
							"neq": {
								"label": "is not"
							},
							"startsWith": {
								"label": "starts with"
							}
						},
						"rules": {
							"widget": "input"
						}
					},
					"type": "string"
				},
				"tags": {
					"items": {
						"$ref": "#/definitions/Tag"
					},
					"type": "array"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"via": {
					"meta": {
						"enum": [
							"email",
							"phone",
							"sms",
							"chat",
							"twitter",
							"facebook",
							"api",
							"form",
							"helpdesk",
							"app"
						],
						"filters": {
							"widget": "multi-select"
						},
						"operators": {
							"eq": {
								"label": "is"
							},
							"neq": {
								"label": "is not"
							}
						},
						"rules": {
							"widget": "select"
						}
					},
					"type": "string"
				}
			},
			"required": [
				"sender",
				"via",
				"channel",
				"messages",
				"requester",
				"receiver"
			],
			"type": "object"
		},
		"TicketMessage": {
			"properties": {
				"attachments": {
					"items": {
						"$ref": "#/definitions/Attachment"
					},
					"type": "array"
				},
				"body_html": {
					"type": "string"
				},
				"body_text": {
					"type": "string"
				},
				"channel": {
					"type": "string"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"external_id": {
					"type": "string"
				},
				"from_agent": {
					"type": "boolean"
				},
				"headers": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"macros": {
					"items": {
						"$ref": "#/definitions/Macro"
					},
					"type": "array"
				},
				"meta": {
					"type": "string"
				},
				"opened_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"public": {
					"type": "boolean"
				},
				"receiver": {
					"$ref": "#/definitions/User"
				},
				"sender": {
					"$ref": "#/definitions/User"
				},
				"stripped_html": {
					"type": "string"
				},
				"stripped_signature": {
					"type": "string"
				},
				"stripped_text": {
					"type": "string"
				},
				"subject": {
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"via": {
					"type": "string"
				}
			},
			"required": [
				"sender",
				"via",
				"channel",
				"receiver"
			],
			"type": "object"
		},
		"User": {
			"properties": {
				"activated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"active": {
					"type": "boolean"
				},
				"auths": {
					"items": {
						"$ref": "#/definitions/UserAuth"
					},
					"type": "array"
				},
				"channels": {
					"items": {
						"$ref": "#/definitions/UserChannel"
					},
					"type": "array"
				},
				"connections": {
					"items": {
						"type": "string"
					},
					"type": "array"
				},
				"country": {
					"type": "string"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"customer": {
					"type": "string"
				},
				"deactivated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"email": {
					"format": "email",
					"type": "string"
				},
				"events": {
					"items": {
						"type": "string"
					},
					"type": "array"
				},
				"external_id": {
					"type": "string"
				},
				"groups": {
					"items": {
						"$ref": "#/definitions/Group"
					},
					"type": "array"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"language": {
					"type": "string"
				},
				"meta": {
					"type": "string"
				},
				"name": {
					"type": "string"
				},
				"organizations": {
					"items": {
						"$ref": "#/definitions/Organization"
					},
					"type": "array"
				},
				"password": {
					"type": "string"
				},
				"roles": {
					"items": {
						"$ref": "#/definitions/Role"
					},
					"type": "array"
				},
				"signature": {
					"type": "string"
				},
				"timezone": {
					"default": "UTC",
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				}
			},
			"required": [
				"password",
				"roles"
			],
			"type": "object"
		},
		"UserAuth": {
			"properties": {
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"data": {
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"name": {
					"type": "string"
				},
				"type": {
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"type": "string"
				},
				"user_id": {
					"format": "int32",
					"type": "integer"
				}
			},
			"type": "object"
		},
		"UserChannel": {
			"properties": {
				"address": {
					"type": "string"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"preferred": {
					"type": "boolean"
				},
				"type": {
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"$ref": "#/definitions/User"
				}
			},
			"required": [
				"address",
				"type"
			],
			"type": "object"
		},
		"UserConnection": {
			"properties": {
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"data": {
					"type": "string"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"type": {
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"type": "string"
				},
				"user_id": {
					"format": "int32",
					"type": "integer"
				}
			},
			"type": "object"
		},
		"View": {
			"properties": {
				"columns": {
					"items": {
						"type": "string"
					},
					"type": "array"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deactivated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"filters": {
					"type": "string"
				},
				"filters_ast": {
					"type": "string"
				},
				"group_by": {
					"type": "string"
				},
				"icon": {
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"name": {
					"type": "string"
				},
				"order": {
					"format": "int32",
					"type": "integer"
				},
				"order_asc": {
					"type": "boolean"
				},
				"order_by": {
					"type": "string"
				},
				"slug": {
					"type": "string"
				},
				"type": {
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"$ref": "#/definitions/User"
				}
			},
			"required": [
				"user",
				"slug"
			],
			"type": "object"
		},
		"Widget": {
			"description": "A widget is a container that is displayed in the sidebar and contains a list of fields",
			"properties": {
				"context": {
					"default": "ticket",
					"description": "In what context to display this widget",
					"type": "string"
				},
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deactivated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"decoration": {
					"$ref": "#/definitions/Decoration"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"fields": {
					"items": {
						"$ref": "#/definitions/WidgetField"
					},
					"type": "array"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"meta": {
					"type": "string"
				},
				"object_path": {
					"description": "Object path - where we get all the values for {this.<property>}. Ex: `ticket.requester.customer.orders`",
					"type": "string"
				},
				"order": {
					"description": "Order in which widgets are displayed. Lowest first.",
					"format": "int32",
					"type": "integer"
				},
				"root": {
					"description": "True if this widget is visible on the root level of the sidebar",
					"type": "boolean"
				},
				"title": {
					"description": "Title of the widget (template)",
					"type": "string"
				},
				"type": {
					"description": "Type of the widget is used for rendering",
					"enum": [
						"top",
						"bottom",
						"list",
						"object",
						"raw"
					],
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"$ref": "#/definitions/User"
				}
			},
			"required": [
				"title",
				"type"
			],
			"type": "object"
		},
		"WidgetField": {
			"description": "A widget field is an item of the widget and displays an arbitrary field from our DB",
			"properties": {
				"created_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"deactivated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"decoration": {
					"$ref": "#/definitions/Decoration"
				},
				"deleted_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"id": {
					"description": "Primary key of the object",
					"format": "int32",
					"type": "integer"
				},
				"label": {
					"description": "Label is a text that helps identify the value of the field",
					"type": "string"
				},
				"order": {
					"description": "Order in which fields are displayed. Lowest first.",
					"format": "int32",
					"type": "integer"
				},
				"type": {
					"default": "field",
					"description": "Type indicates the type of the widget field",
					"enum": [
						"field",
						"widget"
					],
					"type": "string"
				},
				"updated_datetime": {
					"format": "date-time",
					"type": "string"
				},
				"uri": {
					"description": "URI of the object",
					"format": "int32",
					"type": "integer"
				},
				"user": {
					"$ref": "#/definitions/User"
				},
				"value": {
					"$ref": "#/definitions/WidgetFieldValue"
				},
				"widget": {
					"type": "string"
				}
			},
			"type": "object"
		},
		"WidgetFieldValue": {
			"description": "Value is used to present the value of the field and how it should be ",
			"properties": {
				"editable": {
					"description": "Whether the field is editable. Used in combination with `edit_url`",
					"type": "boolean"
				},
				"type": {
					"description": "Data type of the field value",
					"type": "string"
				},
				"url": {
					"description": "URL of the field to an external site",
					"type": "string"
				},
				"value": {
					"description": "Path using this syntax: {self.<fieldName>}",
					"type": "string"
				}
			},
			"type": "object"
		}
	},
	"description": "The new generation helpdesk",
	"info": {
		"title": "Gorgias",
		"version": "0.0.1"
	},
	"parameters": {
		"id": {
			"description": "ID of the target object",
			"format": "int64",
			"in": "path",
			"name": "id",
			"required": true,
			"type": "Integer"
		}
	},
	"paths": {
		"/api/actions/": {
			"get": {
				"description": "Get all action of the account of the user, paginated.",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/Action"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get all actions",
				"tags": [
					"Action"
				]
			},
			"post": {
				"consumes": [
					"application/json"
				],
				"description": "Create a new action",
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"schema": {
							"$ref": "#/definitions/Action"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Create an action",
				"tags": [
					"Action"
				]
			}
		},
		"/api/actions/{id}/": {
			"delete": {
				"description": "Delete an action",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"204": {
						"description": "No content."
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Delete an action",
				"tags": [
					"Action"
				]
			},
			"get": {
				"description": "Get an action based on {id}",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/Action"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get a single action",
				"tags": [
					"Action"
				]
			},
			"put": {
				"consumes": [
					"application/json"
				],
				"description": "Update an action",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"202": {
						"schema": {
							"$ref": "#/definitions/Action"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Update an action",
				"tags": [
					"Action"
				]
			}
		},
		"/api/events/": {
			"get": {
				"description": "Get all events of the account of the user, paginated.",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/Event"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get all events",
				"tags": [
					"Event"
				]
			}
		},
		"/api/events/{id}/": {},
		"/api/integrations/": {
			"get": {
				"description": "Get the list of all integrations (active or not) of the current account",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/User"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get all integration",
				"tags": [
					"Integration"
				]
			},
			"post": {
				"consumes": [
					"application/json"
				],
				"description": "Create a new integration with a new or existing connection to an external service.",
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"schema": {
							"$ref": "#/definitions/Integration"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Create an integration",
				"tags": [
					"Integration"
				]
			}
		},
		"/api/integrations/{id}/": {
			"delete": {
				"description": "Delete an existing integration with the linked connection along",
				"produces": [
					"application/json"
				],
				"responses": {
					"204": {
						"description": "No content."
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Delete an integration",
				"tags": [
					"Integration"
				]
			},
			"get": {
				"description": "Fetch an integration's data with the linked connection.",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/Integration"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get an integration",
				"tags": [
					"Integration"
				]
			},
			"put": {
				"consumes": [
					"application/json"
				],
				"description": "Update an existing integration or its connection",
				"produces": [
					"application/json"
				],
				"responses": {
					"202": {
						"schema": {
							"$ref": "#/definitions/Integration"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Update an integration",
				"tags": [
					"Integration"
				]
			}
		},
		"/api/rules/": {
			"get": {
				"description": "Fetch all the rules of the current account",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/Rule"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Fetch all rules",
				"tags": [
					"Rule"
				]
			},
			"post": {
				"consumes": [
					"application/json"
				],
				"description": "Create a new Rule",
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"schema": {
							"$ref": "#/definitions/Rule"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Create a Rule",
				"tags": [
					"Rule"
				]
			}
		},
		"/api/rules/{id}/": {
			"get": {
				"description": "Fetch a single Rule",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/Rule"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Fetch a single Rule",
				"tags": [
					"Rule"
				]
			},
			"put": {
				"consumes": [
					"application/json"
				],
				"description": "Edit an existing Rule",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"202": {
						"schema": {
							"$ref": "#/definitions/Rule"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Edit a Rule",
				"tags": [
					"Rule"
				]
			}
		},
		"/api/settings/": {
			"get": {
				"description": "Retrieve the settings of the current user's account.",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/AccountMeta"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Retrieve the current account's settings",
				"tags": [
					"Settings"
				]
			},
			"put": {
				"consumes": [
					"application/json"
				],
				"description": "Update the settings of the account of the current user, if he has the rights to do so (e.g. if he is an agent or an admin of this account).\n",
				"produces": [
					"application/json"
				],
				"responses": {
					"202": {
						"schema": {
							"$ref": "#/definitions/AccountMeta"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Update the current account settings",
				"tags": [
					"Settings"
				]
			}
		},
		"/api/tickets/": {
			"get": {
				"description": "Retrieve a list of tickets. If the {view} argument is present in the URL, then the list will correspond to this view's constraints.\n",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/Ticket"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Retrieve a list of tickets",
				"tags": [
					"Ticket"
				]
			},
			"post": {
				"consumes": [
					"application/json"
				],
				"description": "Create a new Ticket along with its Messages.",
				"produces": [
					"application/json"
				],
				"responses": {
					"201": "TicketSchema",
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Create a new Ticket",
				"tags": [
					"Ticket"
				]
			}
		},
		"/api/tickets//messages/": {
			"get": {
				"description": "Retrieve the list of Messages of a Ticket identified by the URL parameter {ticketId}",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/TicketMessage"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Retrieve the list of Messages of a Ticket",
				"tags": [
					"TicketMessage"
				]
			},
			"post": {
				"consumes": [
					"application/json"
				],
				"description": "Create a new TicketMessage and returns it.",
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"schema": {
							"$ref": "#/definitions/TicketMessage"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Create a new TicketMessage",
				"tags": [
					"TicketMessage"
				]
			}
		},
		"/api/tickets//messages/{id}/": {
			"get": {
				"description": "Retrieve a single TicketMessage identified by the URL parameters {ticketId} and {id}.",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/TicketMessage"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Retrieve a single TicketMessage",
				"tags": [
					"TicketMessage"
				]
			}
		},
		"/api/tickets/{id}/": {
			"get": {
				"description": "Retrieve a single Ticket, identified by the URL parameter {id}.",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/Ticket"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Retrieve a single Ticket",
				"tags": [
					"Ticket"
				]
			},
			"put": {
				"consumes": [
					"application/json"
				],
				"description": "Update a Ticket identified by the URL parameter {id} and return it.",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"202": {
						"schema": {
							"$ref": "#/definitions/Ticket"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Update a Ticket",
				"tags": [
					"Ticket"
				]
			}
		},
		"/api/users/": {
			"get": {
				"description": "Retrieve all users of the account of the current user, paginated.",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/User"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Retrieve list of users",
				"tags": [
					"User"
				]
			},
			"post": {
				"consumes": [
					"application/json"
				],
				"description": "Create a new user linked to the current user's account. It's role can be any combination of \"user\", \"agent\" and \"admin\".\n",
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"schema": {
							"$ref": "#/definitions/User"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Create a user",
				"tags": [
					"User"
				]
			}
		},
		"/api/users/{id}/": {
			"delete": {
				"description": "Delete a user identified by the URL parameter {id}.",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"204": {
						"description": "No content."
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Delete a user",
				"tags": [
					"User"
				]
			},
			"get": {
				"description": "Retrieve a single user, identified by the URL parameter {id}. If {id} = 0, the current user is returned.\n",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/User"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Retrieve a single user",
				"tags": [
					"User"
				]
			},
			"put": {
				"consumes": [
					"application/json"
				],
				"description": "Update a user's fields, and return it's new version.",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"202": {
						"schema": {
							"$ref": "#/definitions/User"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Update a user",
				"tags": [
					"User"
				]
			}
		},
		"/api/widgets/": {
			"get": {
				"description": "Get all widgets of the account of the user, paginated.",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/Widget"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get all widgets paginated",
				"tags": [
					"Widget"
				]
			},
			"post": {
				"consumes": [
					"application/json"
				],
				"description": "Create a new widget that will be displayed in the sidebar.",
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"schema": {
							"$ref": "#/definitions/Widget"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Create a widget",
				"tags": [
					"Widget"
				]
			}
		},
		"/api/widgets//fields/": {
			"get": {
				"description": "Get all widget fields of the account of the user, paginated.",
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"items": {
								"$ref": "#/definitions/Widget"
							},
							"type": "array"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get all widget fields paginated",
				"tags": [
					"WidgetField"
				]
			},
			"post": {
				"consumes": [
					"application/json"
				],
				"description": "Create a new widget field that will be displayed inside a widget.",
				"produces": [
					"application/json"
				],
				"responses": {
					"201": {
						"schema": {
							"$ref": "#/definitions/WidgetField"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Create a widget field",
				"tags": [
					"WidgetField"
				]
			}
		},
		"/api/widgets//fields/{id}/": {
			"delete": {
				"description": "Delete a WidgetField",
				"produces": [
					"application/json"
				],
				"responses": {
					"204": {
						"description": "No content."
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Delete a WidgetField",
				"tags": [
					"WidgetField"
				]
			},
			"get": {
				"description": "Get a widget field based on {id}",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/WidgetField"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get a single widget field",
				"tags": [
					"WidgetField"
				]
			},
			"put": {
				"consumes": [
					"application/json"
				],
				"description": "Update a widget field",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"202": {
						"schema": {
							"$ref": "#/definitions/WidgetField"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Update a widget field",
				"tags": [
					"WidgetField"
				]
			}
		},
		"/api/widgets/{id}/": {
			"delete": {
				"description": "Delete a widget",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"204": {
						"description": "No content."
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Delete a widget",
				"tags": [
					"Widget"
				]
			},
			"get": {
				"description": "Get a widget based on {id}",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"200": {
						"schema": {
							"$ref": "#/definitions/Widget"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Get a single widget",
				"tags": [
					"Widget"
				]
			},
			"put": {
				"consumes": [
					"application/json"
				],
				"description": "Update a widget",
				"parameters": [
					{
						"$ref": "#/parameters/id"
					}
				],
				"produces": [
					"application/json"
				],
				"responses": {
					"202": {
						"schema": {
							"$ref": "#/definitions/Widget"
						}
					},
					"400": {
						"description": "Bad request."
					},
					"404": {
						"description": "Not found."
					}
				},
				"summary": "Update a widget",
				"tags": [
					"Widget"
				]
			}
		}
	},
	"swagger": "2.0",
	"tags": [
		{
			"description": "Contains every resources concerning the current account's settings.",
			"name": "Settings"
		},
		{
			"description": "Contains all the endpoints about how to manage users and their roles / groups / organisations.",
			"name": "User"
		},
		{
			"description": "Allows users to create or enable integrations for their account",
			"name": "Integration"
		},
		{
			"description": "Endpoints to manipulate Rules.",
			"name": "Rule"
		}
	]
	}
);

module.exports = openapi;

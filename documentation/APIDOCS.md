<a name="top"></a>
# StorySquadAPI

## Base URL for Deployed API

Not yet deployed.

## Endpoints that require Okta token

| URL                  | Request | Description                                              |
|----------------------|---------|----------------------------------------------------------|
| [/account/login](#GET/api/account/login) | GET | Retrieves account and user info for logged-in account. |
| [/account/login](#POST/api/account/login) | POST | Creates db entry for logged-in account. |
| [/account/login](#PATCH/api/account/login) | PATCH | Updates info for logged-in user |
| [/prompt/:prompt_id](#GET/prompt/:prompt_id) | GET | Retrieves prompt. |
| [/reading/:reading_id](#GET/reading/:reading_id) | GET | Returns URL and S3 key for reading with ID in parameter. |
| [/reading/:reading_id/prompts](#GET/reading/:reading_id/prompts) | GET | Retrieves prompts for specified reading. |
| [/story](#POST/story) | POST | Adds new story to db. |
| [/story/:story_id](GET/story/:story_id) | GET | Retrieves story with specified ID. |
| [/story/:story_id](PATCH/story/:story_id) | PATCH | Updates story with specified ID. |
| /s[tripe/card-wallet](#GET/stripe/card-wallet) | GET | Returns client_secret to update saved cards. |
| [/stripe/payment](#POST/stripe/payment) | POST | Processes payment through Stripe |
| [/stripe/subscribe](#POST/stripe/subscribe) | POST | Sets up new subscription |
| [/student](#POST/student) | POST | Creates new student for logged-in account |
| [/student/:student_id](#GET/student/:student_id) | GET | Retrieves student info |
| [/student/:student_id](#PATCH/student/:student_id) | PATCH | Updates student info |

## Endpoints requiring DS secret

| URL                  | Request | Description                                              |
|----------------------|---------|----------------------------------------------------------|
| [/ds_story/:story_id](#GET/ds_story/:story_id) | GET | Retrieves story info. |
| [/ds_story/:story_id](#PATCH/ds_story/:story_id) | PATCH | Updates story info. |

## Webhook endpoints for Stripe

| URL                  | Request | Description                                              |
|----------------------|---------|----------------------------------------------------------|
| [/stripe/webhook](#POST/stripe/webhook) | POST | Accepts payment notification and updates paid_until |

## Requests and Returns:

### <a name="GET/api/account/login"></a>GET /api/account/login
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        }
    }
```

Returns:
```json
    {
        "account_id": "uuid",
        "username": "string",
        "student_ids": "array of uuids",
        "settings": "json object"
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 401 | PIN token/DB mismatch |
| 404 | User logged in to Okta but not in DB |

### <a name="POST/api/account/login"></a>POST /api/account/login
Request body:
```json
    {
        "email": "string",
        "username": "string",
        "pin": "integer",
        "headers": {
            "Authorization": "token(string)"
        },
        "settings": "JSON object",
        "stripe_token": "token/string"
    }
```

Returns:
```json
    {
        "account_id": "uuid",
        "username": "string",
        "student_ids": "array of uuids",
        "settings": "json object",
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 201 | Success |
| 409 | User already in db |
| 500 | Failed to add user |

### <a name="PATCH/api/account/login"></a>POST /api/account/login
Request body:
```json
    {
        "email": "string",
        "username": "string",
        "pin": "integer",
        "headers": {
            "Authorization": "token(string)"
        },
        "settings": "JSON object",
        "stripe_token": "token/string"
    }
```

Returns:
```json
    {
        "account_id": "uuid",
        "username": "string",
        "student_ids": "array of uuids",
        "settings": "json object",
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 401 | PIN mismatch |
| 404 | User not in db |
| 500 | Failed to update user |

### <a name="GET/ds_story/:story_id"></a>GET /api/ds_story/:story_id
Request body:
```json
    {
        "headers": {
            "Authorization": "secret (string)"
        }
    }
```

Returns:
```json
    {
        "story_id": "uuid",
        "student_id": "uuid",
        "prompt_id": "uuid",
        "s3_url": "string",
        "s3_key": "string",
        "about": "JSON object"
    }
```

### <a name="PATCH/ds_story/:story_id"></a>PATCH /api/ds_story/:story_id
Request body:
```json
    {
        "headers": {
            "Authorization": "secret (string)"
        },
        "s3_url": "string (optional)",
        "s3_key": "string (optional)",
        "about": "JSON object (optional)"
    }
```

Returns:
```json
    {
        "story_id": "uuid",
        "student_id": "uuid",
        "prompt_id": "uuid",
        "s3_url": "string",
        "s3_key": "string",
        "about": "JSON object"
    }
```

### <a name="GET/prompt/:prompt_id"></a>GET /api/prompt/:prompt_id
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        }
    }
```

Returns:
```json
    {
        "prompt_id": "uuid",
        "reading_id": "uuid",
        "prompt_info": "json"
    }
```

### <a name="GET/reading/:reading_id"></a>GET /api/reading/:reading_id
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        }
    }
```

Returns:
```json
    {
        "s3_url": "string",
        "s3_key": "string"
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 404 | No reading found with provided ID |
| 500 | Failed to retrieve reading |

### <a name="GET/reading/:reading_id/prompts"></a>GET /api/reading/:reading_id/prompts
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        }
    }
```

Returns:
```json
    {
        "prompts"
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 404 | No prompts for specified reading |

### <a name="POST/story"></a>POST /api/story
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        },
        "student_id": "uuid",
        "prompt_id": "uuid",
        "s3_url": "string",
        "s3_key": "string",
        "about": "JSON object"
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 400 | Student ID not received. |
| 500 | Server error. |

### <a name="GET/story/:story_id"></a>GET /api/story/:story_id
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        }
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 404 | Story not found. |
| 500 | Server error. |

### <a name="PATCH/story/:story_id"></a>PATCH /api/story/:story_id
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        },
        "student_id": "uuid (optional)",
        "prompt_id": "uuid (optional)",
        "s3_url": "string (optional)",
        "s3_key": "string (optional)",
        "about": "JSON object (optional)"
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 403 | Story not associated with logged-in account. |
| 404 | Story not found. |
| 410 | Authoring student no longer active. |
| 500 | Server error. |

### <a name="GET/stripe/card-wallet"></a>GET /api/stripe/card-wallet
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        },
        "customer_id": "Stripe customer ID"
    }
```

Response:
```json
    {
        "client_secret": "client secret for Stripe wallet/intent"
    }
```

### <a name="POST/stripe/payment"></a>POST /api/stripe/payment
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        },
        "success_url": "redirect URL on success",
        "cancel_url": "redirect URL on cancel"
    }
```

Response:
```json
    {
        "id": "session ID for payment"
    }
```

### <a name="POST/stripe/subscribe"></a>POST /api/stripe/subscribe
Request body:
```json
    {
        "headers": {
            "Authorization": "token(string)"
        },
        "success_url": "redirect URL on success",
        "cancel_url": "redirect URL on cancel"
    }
```

Response:
```json
    {
        "id": "session ID for payment"
    }
```

### <a name="POST/stripe/webhook"></a>POST /api/stripe/webhook
Request body:
```json
    {
        "headers": {
            "stripe-signature":"string"
        },
        "body": "other Stripe-defined contents"
    }
```

Response:
```json
    {
        "status": 200
    }
```

Side effects:

```
account.paid_until updated
```

### <a name="POST/student"></a>POST /api/student
Request body:
```json
    {
        "headers": {
            "Authorization": "token"
        },
        "account_id": "uuid for account",
        "username": "new student username"
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 409 | Username unavailable |
| 500 | Failed to retrieve reading |

### <a name="GET/student/:student_id"></a>GET /api/student/:student_id
Request body:
```json
    {
        "headers": {
            "Authorization": "token"
        }
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 401 | Student not associated with logged-in account |
| 404 | Student with provided id not found |

### <a name="PATCH/student/:student_id"></a>PATCH /api/student/:student_id
Request body:
```json
    {
        "headers": {
            "Authorization": "token"
        },
        "username": "optional",
        "settings": "optional -- whole JSON object",
        "records": "optional -- whole JSON object",
        "pin": "integer"
    }
```

| HTTP Response Code | Reason                 |
|--------------------|------------------------|
| 200 | Success |
| 401 | PIN mismatch or account mismatch |
| 404 | Student with provided id not found |
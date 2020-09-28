<a name="top"></a>
# StorySquadAPI

## Base URL for Deployed API

Not yet deployed.

## Endpoints that require Okta token

| URL                  | Request | Description                                              |
|----------------------|---------|----------------------------------------------------------|
| [/account/login](#GET/api/account/login) | GET | Retrieves account and user info for logged-in account. |
| [/account/login](#POST/api/account/login) | POST | Creates or updates account info for logged-in account. |
| [/reading/:reading_id](#GET/reading/:reading_id) | GET | Returns URL and S3 key for reading with ID in parameter. |

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
        }
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
| 500 | Failed to add user |

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
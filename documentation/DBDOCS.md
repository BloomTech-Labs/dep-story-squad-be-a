# Table Requirements

## Account
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| account_id | uuid | yes | yes | account id (auto-generated) |
| okta_id | uuid | yes | yes | Okta uuid (from token) |
| email | string | yes | yes | email linked to account |
| username | string | yes | yes | account username for display |
| student_ids | text array | no | no | array of studen ids linked to account |
| settings | json object | yes | no | account settings and info |
| hashed_pin | string | yes | no | hash of pin for main account user |
| stripe_token | string | no | no | stripe auth token |

## Reading
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| reading_id | uuid | yes | yes | id for reading file |
| s3_url | string | no | no | URL for reading file (during development) |
| s3_key | string | no | no | S3 key for reading file access |
| about | json | no | no | data, description, and statistics (added as needed) |
| prompts | json | no | no | prompts related to this reading |
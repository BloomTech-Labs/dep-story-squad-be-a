# Contents
| Table | Contains |
|-------|----------|
| [account](#Account) | account (parent) info |
| [prompt](#Prompt) | student writing prompts |
| [story](#Story) | student-uploaded stories |
| [student](#Student) | student (child) info |
| [reading](#Reading) | core Story Squad readings |

### [JSON Object Contents](#JSON)

# Table Requirements

## <a name="Account"></a>Account
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| account_id | uuid | yes | yes | account id (auto-generated) |
| okta_id | uuid | yes | yes | Okta uuid (from token) |
| email | string | yes | yes | email linked to account |
| username | string | yes | yes | account username for display |
| student_ids | text array | no | no | array of student ids linked to account |
| [settings](#account.settings) | json | yes | no | account settings and info |
| hashed_pin | string | yes | no | hash of pin for main account user |
| stripe_token | string | no | no | stripe auth token |

## <a name="Prompt"></a>Prompt
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| prompt_id | uuid | yes | yes | prompt id |
| reading_id | uuid | yes | no | foreign key for reading |
| [prompt_info](#prompt.prompt_info) | json | no | no | info re: prompt, including text |

## <a name="Story"></a>Story
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| story_id | uuid | yes | yes | story id |
| student_id | uuid | yes | no | foreign key for student |
| prompt_id | uuid | yes | no | foreign key for prompt id |
| s3_url | string | no | no | URL for story file (during development) |
| s3_key | string | no | no | S3 key for story file access |
| [about](#story.about) | json | no | no | includes metrics from DS |

## <a name="Student"></a>Student
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| student_id | uuid | yes | yes | student id |
| account_id | uuid | yes | no | foreign key for account |
| username | string | yes | yes | student username |
| hashed_pin | string | yes | no | hash of pin for student user |
| [settings](#student.settings) | json | no | no | student profile/settings |
| [records](#student.records) | json | no | no | student records/history |

## <a name="Reading"></a>Reading
| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| reading_id | uuid | yes | yes | id for reading file |
| s3_url | string | no | no | URL for reading file (during development) |
| s3_key | string | no | no | S3 key for reading file access |
| [about](#reading.about) | json | no | no | data, description, and statistics (added as needed) |
| [prompts](#reading.prompts) | json | no | no | prompts related to this reading |

# <a name="JSON"></a>JSON object contents

### <a name="account.settings"></a>account.settings
{

}

### <a name="prompt.prompt_info"></a>prompt.prompt_info
{
    
}

### <a name="story.about"></a>story.about
{
    
}

### <a name="student.settings"></a>student.settings
{
    
}

### <a name="student.records"></a>student.records
{
    
}

### <a name="reading.about"></a>reading.about
{
    
}

### <a name="reading.prompts"></a>reading.prompts
{
    
}
# README

## usersテーブル
Column|Type|Options|
|------|----|-------|
|name|string|null: false,unique: true|
|email|string|null:false,unique:true|
|password|string|null: false|

### Association
- has_many :groups,through: :users_groups
- has_many :messages
- has_many :group_users

## groupsテーブル
Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null:false,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
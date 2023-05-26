# Update Docs

These documents specify what collections / resources need to be updated when a certain resource is updated.

Shard key constraints may necessitate asynchronous updates to certain resources.

# Creator Info

## Creator Profile Pic
    - Short Stories
      - Tag Search Content
      - Content
      - Creator Content
    - Donations
      - User Donations
    - Creators
      - Creator Profile

## Creator Name
    - Short Stories
      - Tag Search Content
      - Content
      - Creator Content
    - Donations
      - User Donations
    - Creators
      - Creator Profile

# Content Info

## Content Title
    - Short Stories
      - Tag Search Content
      - Content
      - Creator Content
    - Users - due to shard key constraints, have this update when a user visits a page. If the liked data and the content data are different, run an update.
      - Likes
      - Lib Items
      - List Items
      - Flags

## Content Thumbnail

## Genre

## Tags

## Rank and Rel_Rank - Views, Likes, LibAdds, List Adds, Donations, Flags

## Content Description

# User Info

## User Name


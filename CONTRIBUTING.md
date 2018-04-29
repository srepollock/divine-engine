# Contributing

So you’d like to add to this project, that’s great! There are a few steps you need to follow first:

1. Check out the [Project Description](https://github.com/srepollock/daemon-engine/wiki/project-description) page for what this project is working towards and why it’s important.
2. [Your Project](https://github.com/srepollock/daemon-engine/wiki/your-project)

After you’ve read and followed these two pages, now you’re ready to get to work!

## Conventions

[none]

### Naming Conventions

[variable, function, class, class variable, class function, global variable, global function, static variable, static function]

### Documentation

[none]

### Linting

[none]

## Branch

When branching to work on your new feature, or to work on a hotfix, please create a branch with the name:

`feature/[yourBranchName]`

The feature name will be lowerCamelCase to reduce the amount of dashes and to keep in line with the naming functions of the project

## Committing

Committing is essential to git and the best place to describe intermittent changes in your code. Committing is the quintessential element to git, and as I keep talking about it, you get the sense of how much I care about it. With this said, there is a template setup for commit messages that should be used when you fork and clone this project as from [Your Project](https://github.com/srepollock/daemon-engine/wiki/your-project) in the Wiki. The commit template is as follows:

**Commit Summary**
Major working feature (keep to 50 characters)
**Commit Description**
Changes:

[This should be an overall summary of changes to the project at least done in point-form. More detailed prose format is of course allowed. The point of the description is to provide detail of changes and why.]

Issues:

[Please provide a point-form description of issues. Then please submit a formal issue on the GitHub project. Issue guidelines are documented in the project Wiki.]

Comments:

[Other general comments you wish to add]

## Issues

Issues are, well, an issue. Nobody want’s problems pointed out about a project they’ve worked so hard on, so why do I care so much about issues? I care because where there is an issue it’s normally 1 of 2 things.

    1. They don’t understand what the project really is doing.
    2. There is a problem with our code and we need to address it

With either issue there is always a solution, or one that can be coded. When submitting issues, there is a very simple guideline:

```md
# What is the Issue
    [Describe in your best words what you’re trying to do, what you have done, and why (best guess) it’s not working.]

# How to duplicate the issue
    [Can you duplicate this issue? What were the steps you took to working on this project and when this issue arose.]

# Screenshots/Console output/Log files
    [Give screenshots, console output, or log files (whichever is best) to show us what the issue is.]
```

The more information you provide, the better equipped I will be to go about working on the issue. To follow up, please keep in contact with me on the issue, your findings (if any) and if you’d like to work on the issue yourself, check out [Pull Requests](https://github.com/srepollock/daemon-engine/wiki/pull-requests) on how to submit pull requests of the fix.
All issues are welcome, I just ask you please give information on what the issue is.

## Pull Requests

Have you added a new feature that has been requested? Have you fixed an issue sitting on the [issues](https://github.com/srepollock/daemon-engine/issues) page? Have you fixed your own issue? Well now you want to submit a pull request I reckon. If that’s the case, you’ve come to the right place. The Daemon engine has a few rules put in place to ensure quick pull requests for new features to test and develop. As long as you have been following the [commit messages](https://github.com/srepollock/daemon-engine/CONTRIBUTING.md#Committing) you will be setup to write a great pull request.
There are two forms of pull requests, and this is to better document what has happened between different releases for the engine. There is the *master* pull requests and the *develop* pull request.
The following is the *develop* pull request, as this is the most common:

```md
# [Major Feature/Change]

    [Describe the major feature/change in the project. Why is it necessary? What makes it so important it has to be added into the project? What does this version do differently?]

# How to use

    [What is it we are now using in the project? How do others use this amazing new feature/change themselves?]

# Resources

    [What resources did you use to make this change?]
```

The next is the *master* pull request that has more information on specfics in the project:

```md
Title:
    [Release Version] - [Release Date]

Description:
# Summary

    [Describe the major feature/change in the project. Why is it necessary? What makes it so important it has to be added into the project? What does this version do differently?]

# New Features

    [Talk of the new features added into this project with this pull request. What has changed since the last version? What is new? How is it different? Perhaps it would be easiest to reference direct commits here?]

# Fixes

    [What is it we are now using in the project? How do others use this amazing new feature/change themselves?]

# Resources

    [What resources did you use to make this change?]
```

If you follow these as the guides you’re all set up to make some incredible additions to the project!

---
layout: post
title: "Building a pipeline used by multiple repositories with Jenkins and Artifactory"
description: "Automatize the creation of Jenkins jobs for multiple repositories by using a single Jenkinsfile"
author: sal
published: true
featured: true
categories: [Jenkins, Pipeline, DevOps, CI/CD]
image: "https://thepracticaldev.s3.amazonaws.com/i/4b8ts5owa282bx330e8l.jpg"
---

Do you want to use the same pipeline for hundreds of projects without adding a Jenkinsfile to each repo? This guide is for you!

In the section **A** I'm going to show how a single pipeline can be executed automatically by a commit to any of my repositories. I'm using *Remote File Plugin*, which allows you to **make a single Jenkinsfile be triggerable automatically by any of your repos**. The main advantage of this method is to **automate the creation of the jobs**. A similar result can be reached also by using *Pipeline Shared Groovy Libraries Plugin*, that can give you more flexibility in case you want to introduce differences on how every repo is built, but the downside is that you still have to create a Jenkinsfile for each project. 
Even if I’m using Bitbucket (based on Git), this can be easily replaced with Github or any other versioning control tools supported by Jenkins.

In the section **B** I'm going to build a pipeline that execute a Maven build, resolving the dependencies from Artifactory, and then publish the artifacts and the buildinfo to Artifactory.
Eventually I'll test this pipeline on two repositories in which one depends on the other.


## **A. Set up a pipeline for multiple repositories**

**1. Add a webhook on your BitBucket repositories** to trigger the Jenkins job when a commit is pushed. The URL is just the address of the machine where Jenkins is installed + */bitbucket-hook/*. Make it sure to write the *“/”* at the end of the URL because it’ll not work without it.

![Bitbucket webhook](https://thepracticaldev.s3.amazonaws.com/i/05lggu43zapvyk8dvbol.png)

**2. Create a Jenkins Job** by clicking on *New Item > Bitbucket Team/Project* (you need [Bitbucket Branch Source Plugin](https://wiki.jenkins.io/display/JENKINS/Bitbucket+Branch+Source+Plugin) for this).
- Put your bitbucket owner and credentials under Projects. Under *Local File* insert "pom.xml", so that Jenkins can recognize to trigger the pipeline for every repository that has a pom.  After doing so, your job will be able to scan automatically all your projects.
- Create a repository containing only a Jenkinsfile with the pipeline that you want to be executed for all of your repositories. If you're interested about integrating Maven builds with Artifactory you can find an example of a pipeline in the next section, otherwise just make it sure to have the bitbucket trigger to make it work:

```groovy
pipeline {
    ...
    triggers {
        bitbucketPush()
    }
    ...
}
```

- **Connect your Jenkinsfile to your job**. Go to the job configuration, under *Projects* click on *Add > Remote File Plugin* (you need to install [Remote File Plugin](https://plugins.jenkins.io/remote-file)), then add the informations to access the repo containing your pipeline, and specify the name of the script that you want to be triggerable.

![Remote File Plugin](https://thepracticaldev.s3.amazonaws.com/i/2a4gz9jpkv5fappebvmu.png)

From now on, if you want to add one more project, you just have to *Scan Organization Folder*; afterwards the pipeline will be called every time you push to your new repo. You can also automatize the scan operation by easily setting a periodical scan trigger in the configuration page of your *Bitbucket Team/Project*.


## **B. Integrate with JFrog Artifactory**

**1. Configure Maven and JDK** on *Manage Jenkins > Global Tool Configuration*

![Maven Setup](https://thepracticaldev.s3.amazonaws.com/i/ytfj0tcxpsdokqeju63v.png)

| ![JDK Setup](https://thepracticaldev.s3.amazonaws.com/i/2j1mwu7uff2ekhgxuhqu.png) | 
|:--:| 
| <sub><sup> N.B. Use “Install Automatically” only if Jenkins is running on a RedHat machine, otherwise it will throw an IllegalArgumentException</sup></sub> |

**2. Create the repositories on Artifactory**
- Create a local repository on Artifactory

![Local Repo Artifactory](https://thepracticaldev.s3.amazonaws.com/i/sw919qzfp98lye4ws18d.png)
- Create a virtual repository containing the local one

![Virtual Repo Artifactory](https://thepracticaldev.s3.amazonaws.com/i/1nzzisxqbc4zr6522jw6.png)

**3. Configure Artifactory on Jenkins** on *Manage Jenkins > Configure System*

![Artifactory Setup](https://thepracticaldev.s3.amazonaws.com/i/sgqv7b74l6bervvseldp.png)

In order to resolve your dependencies from Artifactory when a build is executed on Jenkins, you need to set the settings.xml
- Generate settings.xml from Artifactory by going on your virtual repository and then *Set Me Up > Generate Maven Settings*
- Go on *Manage Jenkins > Managed Files > Add a new Config* and insert your settings.xml here (you need [Config File Provider Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Config+File+Provider+Plugin))
- If you want to resolve the dependencies from Artifactory during your local builds as well, put the settings.xml also at *%USERPROFILE%\.m2\settings.xml*. Your repository configuration should look like this:

{% gist 32e13796985e1846076c3f051f2194fc %}

**4. Write your pipeline**. Here is my Jenkinsfile (I'm using the declarative syntax):

{% gist 42da9069e13b61a238f51c36754de97b %}

If you want to use it automatically on multiple projects, you just have to push this file to the repository declared on the *Remote File Plugin* part of **A.2**

**5. Try it out!** I have two repositories on bitbucket: *jenkins-project1* and *jenkins-project2*. The latter depends on the former, so that I can test whether the dependencies are resolved from Artifactory correctly. Let’s try building project1 and then project2

![Build Project1](https://thepracticaldev.s3.amazonaws.com/i/u2j48s8m6yprbhax2hr9.PNG)
![Build Project2](https://thepracticaldev.s3.amazonaws.com/i/yzxggbldjoi17k7k2e51.PNG)


Congratulations! You successfully integrated Artifactory and Jenkins with multiple repository by creating only one pipeline. If you want to have a look of the projects that I built on this tutorial, you can find them on [GitHub](https://github.com/robertobatts/jenkins-artifactory-tutorial/).
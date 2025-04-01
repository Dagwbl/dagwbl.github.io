---
title: "摘一个scoop安装的docker遇到的启动问题"
date: "2022-02-16T17:38:57Z"
slug: "11"
tags: []
---
The pipe access that the error message mentions is a (probably unrelated) issue when docker client is run by non-admin users (see here).

I think the most likely explanation is that the docker service has failed to start.

When you ran dockerd you were actually starting an instance of the daemon - and the line API listen on //./pipe/docker_engine means that the system service hadn't started previously - as the instance you started could create the pipe.

If you stop the running dockerd instance and run:

 Get-Service docker | Restart-Service
 Get-WinEvent -logname application | where ProviderName -eq docker | sort TimeCreated
You should be able to compare the log output with your manual start of dockerd, and see if any errors are blocking the service from starting.

If the event log records API listen on //./pipe/docker_engine then Get-Service docker should show the service as running, and your docker commands should be ok.

[Edit]

Looks like the uninstall of docker was failing because the service doesn't exist. Yet, the install is succeeding except for the service installation.

You can re-register the service with &'C:\\Program Files\\Docker\\dockerd.exe' --register-service

Maybe this will fail if the VPS provider is somehow stopping services from being registered?

Another option is to run docker interactively in one shell with &'C:\\Program Files\\Docker\\dockerd.exe' --run-service, and run your docker commands in another shell.

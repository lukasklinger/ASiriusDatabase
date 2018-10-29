# ASiriusDatabase
This Node.js application saves the last 100 items (songs and other information) of several SiriusXM radio stations (The Pulse, The Blend and Hits 1). It then exposes JSON endpoints for each station which return the cached data. The application does not need any database running in the background, however, data is not permanent between restarts.

## Available stations and JSON endpoints:
SiriusXM The Pulse - /thepulse  
SiriusXM The Blend - /theblend  
SiriusXM Hits 1 - /hits1  

## Docker:
Build for arm32v7 architecture:  
docker build -f Dockerfile.arm32v7 -t asiriusdatabase .

Run:  
docker run --restart unless-stopped -d --name asiriusdatabase -p 3000:3000 asiriusdatabase

#### Note:
I am just a beginner when it comes to Node.js, the code here works, but it sure ain't pretty. ;-)

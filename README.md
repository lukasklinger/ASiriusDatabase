# ASiriusDatabase
This Node.js application saves the last 100 songs of several SiriusXM radio stations.

## Available stations and JSON endpoints:
SiriusXM The Pulse - /thepulse  
SiriusXM The Blend - /theblend  
SiriusXM Hits 1 - /hits1  

## Docker:
Build for arm32v7 architecture:  
docker build -f Dockerfile.arm32v7 -t asiriusdatabase .

Run:  
docker run --restart unless-stopped -d --name asiriusdatabase -p 3000:3000 asiriusdatabase

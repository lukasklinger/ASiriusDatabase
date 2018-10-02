# ASiriusDatabase
This Node.js application saves the last 100 songs of several SiriusXM radio stations.

Build for arm32v7 architecture: docker build -f Dockerfile.arm32v7 -t asiriusdatabase .

Run: docker run --restart unless-stopped -d --name asiriusdatabase -p 3000:3000 asiriusdatabase

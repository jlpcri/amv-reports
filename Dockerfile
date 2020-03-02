FROM openjdk:8-jre-alpine
WORKDIR /
ADD ./build/libs/amv-reports-1.1.jar amv-reports.jar
EXPOSE 8080
CMD java -Xms2g -Xmx2g -XX:NewRatio=2 -Dserver.port=8080 -jar amv-reports.jar

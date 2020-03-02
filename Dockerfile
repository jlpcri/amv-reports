FROM openjdk:8-jre-alpine
WORKDIR /
ADD ./build/libs/amv-reports.jar amv-reports.jar
EXPOSE 8080
CMD java -Xms1536m -Xmx1536m -XX:NewRatio=2 -Dserver.port=8080 -jar amv-reports.jar

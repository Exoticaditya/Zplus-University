# ===========================================
# Zplus University - Dockerfile
# ===========================================
# Multi-stage build for optimized image size

# --- Stage 1: Build ---
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app

# Copy Maven wrapper and pom.xml first for dependency caching
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

# Download dependencies (uses cache if pom.xml hasn't changed)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code and build
COPY src src
RUN ./mvnw package -DskipTests -B

# --- Stage 2: Run ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

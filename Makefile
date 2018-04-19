ENV_LOCALHOST=localhost
ENV_DEVELOPMENT=development
ENV_STAGING=staging
ENV_PRODUCTION=production

SERVICES_PRODUCTION=frontendproduction
SERVICES_STAGING=frontendstaging
SERVICES_DEFAULT=frontend

#Defaults
ENV=$(ENV_DEVELOPMENT)
SERVICES=$(SERVICES_DEFAULT)

#makes to use with Jenkins builds
container-build-production: env-production build
container-build-staging: env-staging build
container-build-development: env-development build

run-development: clean print-services-up
	@docker-compose up -d $(SERVICES)
run-staging: clean env-staging print-services-up
	@docker-compose up -d $(SERVICES)
run-production: clean env-production print-services-up
	@docker-compose up -d $(SERVICES)

#makes to manually build and spin up container, note if image is already built
#just use cmd "make run" instead
container-production: env-production clean build run print-env
container-staging: env-staging clean build run print-env
container-development: env-development clean build run print-env

#############################################################

#private make cmds, do not call directly
#############################################################
print-services-build:
	$(info docker-compose build using services="$(SERVICES)")
print-services-up:
	$(info docker-compose up using services="$(SERVICES)")
print-env:
	$(info ENVIRONMENT="$(ENV)")
build: print-services-build
	@docker-compose build --force-rm --build-arg ENVIRONMENT=$(ENV) $(SERVICES)
stop:
	@docker-compose stop
clean:	stop
	@docker-compose rm -f
#Environments
env-development:
	$(eval ENV = $(ENV_DEVELOPMENT))
env-staging:
	$(eval ENV = $(ENV_STAGING))
	$(eval SERVICES = $(SERVICES_STAGING))
env-production:
	$(eval ENV = $(ENV_PRODUCTION))
	$(eval SERVICES = $(SERVICES_PRODUCTION))

lines := 1000
compose := docker compose


build:
	sudo $(compose) up --build -d 

down:
	sudo $(compose) down

stop:
	sudo $(compose) stop

ps:
	sudo $(compose) ps



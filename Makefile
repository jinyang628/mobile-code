.PHONY: lint

lint:
	cd frontend && npx prettier --write .
	cd server && poetry run black .
	cd server && poetry run isort .
	cd server && poetry run autoflake --in-place --remove-all-unused-imports --recursive .

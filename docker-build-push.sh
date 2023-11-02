docker build . -t fmaylinch/gpt-chat
docker push fmaylinch/gpt-chat
# docker run -p 3000:3000 -e OPENAI_API_KEY=xxx -d fmaylinch/openai-gpt

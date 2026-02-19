FROM ruby:3.4.4

RUN apt-get update -qq && \
    apt-get install -y nodejs npm default-mysql-client

WORKDIR /app

COPY . .

RUN bundle install

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
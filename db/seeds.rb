# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Message.destroy_all
User.destroy_all
Channel.destroy_all

ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

names = %w(general paris react)
nicknames = %w(morgan pedrolo laponte SuperUser)


users = nicknames.map do |nickname|
  User.create(email: "#{nickname.downcase}@chat.com", nickname: nickname, password: "#{nickname.downcase}")
end

channels = names.map do |name|
  Channel.find_or_create_by(name: name)
end

messages = names.map do |name|
  Message.create! user: User.find_by(nickname: 'SuperUser'), channel: Channel.find_by(name: name), content: "Welcome to ##{name}"
end

puts 'Channels:'
channels.each do |channel|
  puts "- #{channel.id}: #{channel.name}"
end

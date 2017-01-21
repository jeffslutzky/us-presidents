# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'nokogiri'
require 'open-uri'

url = "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States_by_age"
doc = Nokogiri::HTML(open(url))
# presidents = doc.css("table").first.css("tr")
presidents = doc.css(".sortable").first.elements
presidents.shift
presidents.pop
presidents.each do |president|
	prez = President.create
	prez.name_lastfirst = president.elements[1].children[0].text
	prez.name_firstlast = president.elements[1].children.last.text
	prez.birth_date = president.elements[2].children[0].text
	prez.inauguration_date = president.elements[3].children[0].text
	prez.left_office = president.elements[5].children[0].text if president.elements[5].children[0]
	prez.death_date = president.elements[8].children[0].text
	prez.save
end

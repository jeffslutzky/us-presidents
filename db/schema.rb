# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151203024018) do

  create_table "presidents", force: :cascade do |t|
    t.string   "name_firstlast"
    t.string   "name_lastfirst"
    t.date     "birth_date"
    t.date     "inauguration_date"
    t.date     "left_office"
    t.date     "death_date"
    t.time     "age_at_inauguration"
    t.time     "age_at_retirement"
    t.time     "age_at_death"
    t.time     "length_of_retirement"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

end

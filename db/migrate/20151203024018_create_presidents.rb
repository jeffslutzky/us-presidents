class CreatePresidents < ActiveRecord::Migration
  def change
    create_table :presidents do |t|
      t.string :name_firstlast
      t.string :name_lastfirst
      t.date :birth_date
      t.date :inauguration_date
      t.date :left_office
      t.date :death_date

      t.timestamps null: false
    end
  end
end

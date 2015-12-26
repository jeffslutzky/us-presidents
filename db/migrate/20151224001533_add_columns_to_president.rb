class AddColumnsToPresident < ActiveRecord::Migration
  def change
    add_column :presidents, :age_at_death, :integer
    add_column :presidents, :age_at_inauguration, :integer
  end
end

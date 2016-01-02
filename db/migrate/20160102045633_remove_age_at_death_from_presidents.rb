class RemoveAgeAtDeathFromPresidents < ActiveRecord::Migration
  def change
    remove_column :presidents, :age_at_death, :integer
  end
end

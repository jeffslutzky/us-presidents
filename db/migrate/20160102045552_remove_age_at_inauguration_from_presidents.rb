class RemoveAgeAtInaugurationFromPresidents < ActiveRecord::Migration
  def change
    remove_column :presidents, :age_at_inauguration, :integer
  end
end

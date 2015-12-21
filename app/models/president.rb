# == Schema Information
#
# Table name: presidents
#
#  id                :integer          not null, primary key
#  name_firstlast    :string
#  name_lastfirst    :string
#  birth_date        :date
#  inauguration_date :date
#  left_office       :date
#  death_date        :date
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class President < ActiveRecord::Base

  def retirement_in_days
    (self.death_date - self.left_office).to_i
  end

end

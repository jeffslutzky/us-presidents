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

  def alive?
    self.death_date > Date.parse("2007-01-01")
  end

  def retirement_in_days
    if !self.left_office # Obama
      0
    elsif alive?
      (Date.today - self.left_office).to_i
    else
      (self.death_date - self.left_office).to_i
    end
  end

  def lifespan
    if alive?
      (Date.today - self.birth_date).to_i
    else
      (self.death_date - self.birth_date).to_i
    end
  end

  def age_at_inauguration
    (self.inauguration_date - self.birth_date).to_i
  end

  def presidency_length
    if !self.left_office # Obama
      (Date.today - self.inauguration_date).to_i
    else
      (self.left_office - self.inauguration_date).to_i
    end
  end

end

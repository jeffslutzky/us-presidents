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

require 'test_helper'

class PresidentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

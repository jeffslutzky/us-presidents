class RetirementsViewObject

  def initialize(presidents)
    @presidents = presidents
  end

  def get_data
    @presidents.each_with_object({}) do |president, hash|
      hash[president.name_firstlast] = president.retirement_in_days
    end
  end

end

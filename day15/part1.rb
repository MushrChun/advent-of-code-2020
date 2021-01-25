# frozen_string_literal: true

nums = File.read('./input.txt').split(',').map(&:to_i)

cache = {}

nums.each_with_index do |num, idx|
  cache[num] = [idx]
end

last = nums.last

puts "cache: #{cache}"
puts "last: #{last}"

def cache_add(cache, last, idx)
  if cache.include?(last)
    cache[last].unshift(idx)
  else
    cache[last] = [idx]
  end
end

(nums.length...2020).each do |idx|
  puts "\##{idx + 1}"
  last =
    if cache.include?(last) && cache[last].length >= 2
      second, frist = cache[last]

      second - frist
    else
      0
    end

  cache_add(cache, last, idx)

  # puts "cache #{cache}"
  # puts "last #{last}"
end

puts last

# frozen_string_literal: true

lines = File.read('./input.txt').lines(chomp: true)

rules, your_ticket, nearby_tickets = lines.slice_after(&:empty?).to_a

your_ticket = your_ticket[1].split(',').map(&:to_i)
nearby_tickets = nearby_tickets[1..-1].map { |s| s.split(',').map(&:to_i) }
rules = rules[0..-2].collect do |line|
  name, d1, d2, d3, d4 = line.match(/([\w ]+): (\d+)-(\d+) or (\d+)-(\d+)/).captures
  [name, d1.to_i, d2.to_i, d3.to_i, d4.to_i]
end

def valid?(rules, num)
  rules.any? { |rule| single_valid?(rule, num) }
end

def single_valid?(rule, num)
  _, d1, d2, d3, d4 = rule
  (d1..d2).include?(num) || (d3..d4).include?(num)
end

nearby_tickets.keep_if do |tickets|
  tickets.all? { |num| valid?(rules, num) }
end

p your_ticket
p rules
p nearby_tickets

nearby_tickets_t = nearby_tickets.transpose

def find_match(nums, rules)
  rules.map.with_index do |rule, i|
    next i if nums.all? { |num| single_valid?(rule, num) }

    nil
  end.compact
end

match_a = nearby_tickets_t.map.with_index do |v, i|
  [i, find_match(v, rules)]
end

ans_a = {}

loop do
  total_s = 0
  target = nil

  m_num, m_arr = match_a.find { |_, arr| arr.length == 1 }

  target = m_arr.first
  ans_a[m_num] = target

  match_a.each do |_, arr|
    arr.delete(target)
    total_s += arr.length
  end

  break if total_s.zero?
end

ans =
  ans_a
  .filter { |_, rule_n| rules[rule_n].first.include?('departure') }
  .map { |col, _| your_ticket[col] }
  .reduce(:*)

p(ans)

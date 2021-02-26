# frozen_string_literal: true

lines = File
        .read('./input.txt')
        .lines(chomp: true)

def calculate(line)
  value = []
  ops = []

  line.chars do |char|
    case char
    when /[0-9]/
      if !ops.last.nil? && ops.last != '('
        value.push(eval("#{value.pop}#{ops.pop}#{char}"))
      else
        value.push(char)
      end
    when '+', '*', '('
      ops.push(char)
    when ')'
      if ops.last == '('
        ops.pop

        value.push(eval("#{value.pop}#{ops.pop}#{value.pop}")) if ops.last != '('
      else
        raise 'unexpected calculate logic'
      end
    when ' '
      next
    else raise "unexpected char: #{char}"
    end
  end

  value.first
end

pp lines.map { |line| calculate(line) }.sum

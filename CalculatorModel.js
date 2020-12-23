
    const DEFAULT_START_VALUE = 0;
    class CalculatorModel
    {
        static Numbers = [];
        static Operators = [];
        static MostRecentNumber = DEFAULT_START_VALUE;
        static MostRecentOperator = "";
        static MostRecentResult = DEFAULT_START_VALUE;

        static CalculateResult()
        {
            return this.Calculate(this.Numbers, this.Operators);
        }

        static Calculate(numbers, operators)
        {
            var tempNumbers = numbers.slice();
            var currentValue = tempNumbers[0];
            var currentOperator = "";
            tempNumbers.shift();
            for(var i = 0; i < operators.length && tempNumbers.length > 0; i++)
            {
                currentOperator = operators[i];
                switch(ElementEvaluator.EvaluateValue(currentOperator))
                {
                    case ElementEnum.PLUS:
                        currentValue += tempNumbers[0];
                        break;
                    case ElementEnum.MINUS:
                        currentValue -= tempNumbers[0];
                        break;
                    case ElementEnum.MULTIPLICATION:
                        currentValue *= tempNumbers[0];
                        break;
                    case ElementEnum.DIVISION:
                        currentValue /= tempNumbers[0];
                        break;
                    default:
                        currentValue = DEFAULT_START_VALUE;
                        break;
                }
                tempNumbers.shift();
            }
            return currentValue;
        }

        static AddOperatorToCalculation(tempOperator)
        {
            this.Operators.push(tempOperator);
            this.MostRecentOperator = tempOperator;
        }

        static AddNumberToCalculation(number)
        {
            this.Numbers.push(number);
            this.MostRecentNumber = number;
        }

        static GetResult()
        {
            var result = 0;
            if (this.Numbers.length > this.Operators.length && this.Numbers.length > 1 && this.Operators.length > 0)
                result = this.CalculateResult();
            else
                result = DEFAULT_START_VALUE;
            this.MostRecentResult = result;
            return result;
        }

        static Clear()
        {
            this.Numbers = [];
            this.Operators = [];
        }

        static GetAmountOfNumbers() 
        {
            return this.Numbers.length;
        }

        static GetAmountOfOperators() 
        {
            return this.Operators.length;
        }
    }

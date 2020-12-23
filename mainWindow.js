const MAX_NUMBER_BEFORE_DECIMAL_WRAP = 10000000;
class MainWindow
    {

        AddNumericalElement(element)
        {
            if (NumberBuilder.BuildNumber() == CalculatorModel.MostRecentResult)
                NumberBuilder.NewNumber();
            NumberBuilder.Append(ElementEvaluator.EvaluateElement(element));
            this.ShowNumber(NumberBuilder.BuildNumber());
        }

        AddOperatorElement(element)
        {
            var builtNumber = NumberBuilder.BuildNumber();
            CalculatorModel.AddNumberToCalculation(builtNumber);
            CalculatorModel.AddOperatorToCalculation(ElementEvaluator.EvaluateElement(element));
            this.ShowNumber(builtNumber);
            NumberBuilder.NewNumber();
        }

        DoOperation()
        {
            var mostRecentNumber = CalculatorModel.MostRecentNumber;

            var builtNumber = NumberBuilder.BuildNumber();
            if (CalculatorModel.GetAmountOfOperators() == 0)
            {
                CalculatorModel.AddNumberToCalculation(CalculatorModel.MostRecentResult);
                CalculatorModel.AddOperatorToCalculation(CalculatorModel.MostRecentOperator);
                CalculatorModel.AddNumberToCalculation(mostRecentNumber);
            }
            else 
            {
                CalculatorModel.AddNumberToCalculation(builtNumber);
            }
            NumberBuilder.NewNumber();
            this.ShowResult();
        }

        ShowResult()
        {
            var resultValue = CalculatorModel.GetResult();
            this.ShowNumber(resultValue);
            CalculatorModel.Clear();
            NumberBuilder.NewNumber();
            NumberBuilder.Append(resultValue.toString());
        }

        ShowNumber(num)
        {
            var textToShow = "";
            if(num > MAX_NUMBER_BEFORE_DECIMAL_WRAP)
                textToShow = num.toExponential(4);
            else if(num.toString().length > 9) 
                textToShow = num.toPrecision(9);
            else
                textToShow = num;
            document.getElementById("Result").textContent = textToShow;
        }
    }
    

    var mainWindow = new MainWindow();

    function ZeroButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.ZERO);
    }

    function OneButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.ONE);
    }

    function TwoButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.TWO);
    }

    function ThreeButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.THREE);
    }

    function FourButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.FOUR);
    }
    
    function FiveButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.FIVE);
    }

    function SixButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.SIX);
    }

    function SevenButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.SEVEN);
    }

    function EightButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.EIGHT);
    }

    function NineButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.NINE);
    }

    function DecimalButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.DECIMAL);
    }

    function SignChangeButtonClick()
    {
        mainWindow.AddNumericalElement(ElementEnum.SIGN_CHANGE);
    }

    function EqualButtonClick()
    {
        mainWindow.DoOperation();
    }

    function DivisionButtonClick()
    {
        mainWindow.AddOperatorElement(ElementEnum.DIVISION);
    }

    function MultiplicationButtonClick()
    {
        mainWindow.AddOperatorElement(ElementEnum.MULTIPLICATION);
    }

    function MinusButtonClick()
    {
        mainWindow.AddOperatorElement(ElementEnum.MINUS);
    }

    function PlusButtonClick()
    {
        mainWindow.AddOperatorElement(ElementEnum.PLUS);
    }

    function ClearButtonClick()
    {
        NumberBuilder.NewNumber();
        mainWindow.ShowNumber(DEFAULT_START_VALUE);
    }

    function ClearAllButtonClick()
    {
        NumberBuilder.NewNumber();
        CalculatorModel.Clear();
        mainWindow.ShowNumber(DEFAULT_START_VALUE);
    }

    function AssignButtonClicks()
    {
        document.getElementById("ZeroButton").onclick = ZeroButtonClick;
        document.getElementById("OneButton").onclick = OneButtonClick;
        document.getElementById("TwoButton").onclick = TwoButtonClick;
        document.getElementById("ThreeButton").onclick = ThreeButtonClick;
        document.getElementById("FourButton").onclick = FourButtonClick;
        document.getElementById("FiveButton").onclick = FiveButtonClick;
        document.getElementById("SixButton").onclick = SixButtonClick;
        document.getElementById("SevenButton").onclick = SevenButtonClick;
        document.getElementById("EightButton").onclick = EightButtonClick;
        document.getElementById("NineButton").onclick = NineButtonClick;
        document.getElementById("SignChangeButton").onclick = SignChangeButtonClick;
        document.getElementById("DecimalButton").onclick = DecimalButtonClick;

        document.getElementById("PlusButton").onclick = PlusButtonClick;
        document.getElementById("MinusButton").onclick = MinusButtonClick;
        document.getElementById("MultiplicationButton").onclick = MultiplicationButtonClick;
        document.getElementById("DivisionButton").onclick = DivisionButtonClick;
        document.getElementById("EqualButton").onclick = EqualButtonClick;
        document.getElementById("ClearButton").onclick = ClearButtonClick;
        document.getElementById("ClearAllButton").onclick = ClearAllButtonClick;
    }

    AssignButtonClicks();
<template>
  <div class="form_create_retail">
    <form class="ui form">
      <h4 class="ui dividing header">Информация о торговой точке</h4>
      <div class="field">
        <label>Name</label>
        <div class="two fields">
          <div class="field">
            <input type="text" name="shipping[first-name]" placeholder="First Name" />
          </div>
          <div class="field">
            <input type="text" name="shipping[last-name]" placeholder="Last Name" />
          </div>
        </div>
      </div>
      <div class="field">
        <label>Платёжный адресс</label>
        <div class="fields">
          <div class="twelve wide field">
            <input type="text" name="shipping[address]" placeholder="Улица " />
          </div>
          <div class="four wide field">
            <input type="text" name="shipping[address-2]" placeholder="Apt #" />
          </div>
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>State</label>
          <select class="ui fluid dropdown">
            <option value>State</option>
            <option value="AL">Alabama</option>
          </select>
        </div>
        <div class="field">
          <label>Страны</label>
          <div class="ui fluid search selection dropdown">
            <input type="hidden" name="country" />
            <i class="dropdown icon"></i>
            <div class="default text">Выберите страну</div>
            <div class="menu">
              <div class="item" data-value="sh">
                <i class="sh flag"></i>Saint Helena
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="ui dividing header">Billing Information</h4>
      <div class="field">
        <label>Card Type</label>
        <div class="ui selection dropdown">
          <input type="hidden" name="card[type]" />
          <div class="default text">Тип</div>
          <i class="dropdown icon"></i>
          <div class="menu">
            <div class="item" data-value="visa">
              <i class="visa icon"></i> Visa
            </div>
            <div class="item" data-value="amex">
              <i class="amex icon"></i> American Express
            </div>
            <div class="item" data-value="discover">
              <i class="discover icon"></i> Открытие
            </div>
          </div>
        </div>
      </div>
      <div class="fields">
        <div class="seven wide field">
          <label>Номер карты</label>
          <input type="text" name="card[number]" maxlength="16" placeholder="Карта #" />
        </div>
        <div class="three wide field">
          <label>CVC</label>
          <input type="text" name="card[cvc]" maxlength="3" placeholder="CVC" />
        </div>
        <div class="six wide field">
          <label>Просрочка</label>
          <div class="two fields">
            <div class="field">
              <select class="ui fluid search dropdown" name="card[expire-month]">
                <option value>Месяц</option>
                <option value="1">Январь</option>
              </select>
            </div>
            <div class="field">
              <input type="text" name="card[expire-year]" maxlength="4" placeholder="Year" />
            </div>
          </div>
        </div>
      </div>
      <h4 class="ui dividing header">Квитанция</h4>
      <div class="field">
        <label>Отправить квитанцию :</label>
        <div class="ui fluid multiple search selection dropdown">
          <input type="hidden" name="receipt" />
          <i class="dropdown icon"></i>
          <div class="default text">Сохранить контакты</div>
          <div class="menu">
            <div class="item" data-value="jenny" data-text="Дженни">
              <img class="ui mini avatar image" src="" /> Jenny Hess
            </div>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <div class="field">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="gift" tabindex="0" class="hidden" />
            <label>Не вкладывать квитанцию в посылку</label>
          </div>
        </div>
      </div>
      <div class="ui button" tabindex="0">Подтвердить заказ</div>
    </form>
  </div>
</template>
<script>
export default {
  name: "CreateRetail"
};
</script>
<style>
.form_create_retail{
    display: grid;
    grid-template-columns: 90%;
}
</style>
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import type { LoginCredentials } from '../types/user.types';
const Login: React.FC = () => {
const navigate = useNavigate();
const { login } = useAuth();
const [isSubmitting, setIsSubmitting] = useState(false);
const {
    values,
errors,
handleChange,
handleBlur,
validate,
} = useForm<LoginCredentials>(
{
email: '',
password: '',
},
{
email: (value) => {
if (!value) return 'Email é obrigatório';
if (!/\S+@\S+\.\S+/.test(value)) return 'Email inválido';
return null;
},
password: (value) => {
if (!value) return 'Senha é obrigatória';
if (value.length < 8) return 'Senha deve ter no mínimo 8 caracteres';
return null;
},
}
);
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (!validate()) {
return;
}
setIsSubmitting(true);
const success = await login(values);
setIsSubmitting(false);
if (success) {
navigate('/');
}
};
return (
<div>
<div>
<h1>
Better Than Yesterday
</h1>
<h2>
Entrar
</h2>
<form onSubmit={handleSubmit}>
<Input
type="email"
name="email"
label="Email"
value={values.email}
onChange={handleChange}
onBlur={handleBlur}
error={errors.email}
placeholder="seu@email.com"
/>
<Input
type="password"
name="password"
label="Senha"
value={values.password}
onChange={handleChange}
onBlur={handleBlur}
error={errors.password}
placeholder="••••••••"
/>
<Button
type="submit"
variant="primary"
fullWidth
isLoading={isSubmitting}
className="mt-6"
>
Entrar
</Button>
</form>
<p>
Não tem uma conta?{' '}
<Link to="/register" className="text-primary hover:underline">
Criar conta
</Link>
</p>
</div>
</div>
);
};
export default Login;